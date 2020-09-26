const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const PropertySchema = new Schema({
  owner: {
    type: String,
    required: [true, 'Please add a owner'],
    unique: true,
    trim: true,
    maxlength: [50, 'Owner can not be more than 50 characters']
  },
  slug: String, // a slug is basically a url friendly version of the owner (e.g Sujimoto Construction becomes sujimoto-construction)
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description can not be more than 500 characters']
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    // GeoJSON Point
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'] // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  listings: {
    // Array of Strings
    type: [String],
    required: true,
    enum: [
      'Detached',
      'Duplex',
      'Triplex',
      'Apartment',
      'Penthouse',
      'Bungalow',
      'Mansion',
      'Skyscraper',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating can not be more than 10']
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

// Create property slug from the owner
PropertySchema.pre('save', function (next) {
  this.slug = slugify(this.owner, {
    lower: true
  });
  next();
});

// Geocode & create location field
PropertySchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  // Do not save address in DB
  this.address = undefined;
  next();
});

// Cascade delete apartment when a property is deleted
PropertySchema.pre('remove', async function (next) {
  console.log(`Apartments being removed from property ${this._id}`);
  await this.model('Apartment').deleteMany({
    property: this._id
  });
  next();
});

// Reverse populate with virtuals
PropertySchema.virtual('apartments', {
  ref: 'Apartment',
  localField: '_id',
  foreignField: 'property',
  justOne: false
});

module.exports = mongoose.model('Property', PropertySchema);