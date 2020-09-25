const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add apartment title']
  },
  price: {
    type: Number,
    required: [true, 'Please add apartment cost']
  },
  units: {
    type: Number,
    required: [true, 'Please add units available']
  },
  bedroom: {
    type: Number,
    required: [true, 'Please add number of bedroom']
  },
  kitchen: {
    type: Number,
    required: [true, 'Please add number of kitchen']
  },
  bathroom: {
    type: Number,
    required: [true, 'Please add number of bathroom']
  },
  cinema: {
    type: Boolean,
    default: false
  },
  terrace: {
    type: Boolean,
    default: false
  },
  lounge: {
    type: Boolean,
    default: false
  },
  isAutomated: {
    type: Boolean,
    default: false
  },
  penthouse: {
    type: Boolean,
    default: false
  },
  pentSwimmingPool: {
    type: Boolean,
    default: false
  },
  amenities: {
    // Array of Strings
    type: [String],
    required: true,
    enum: [
      'Lux Appliances',
      'wifi',
      'Swimming Pool',
      'Parking Place',
      'Gym and Fitness',
      'Outdoor Space',
      'Fireplace',
      'Elevator',
      'Basketball court',
      'Lawn Tennis court'
    ]
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  property: {
    type: mongoose.Schema.ObjectId,
    ref: 'Property',
    required: true
  }
});

// Static method to get avg of apartment price
ApartmentSchema.statics.getAverageCost = async function (propertyId) {
  // console.log('Calculating avg cost...'.blue);
  const obj = await this.aggregate([{
      $match: {
        property: propertyId
      }
    },
    {
      $group: {
        _id: '$property',
        averageCost: {
          $avg: '$price'
        }
      }
    }
  ]);

  try {
    await this.model('Property').findByIdAndUpdate(propertyId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    });
  } catch (err) {
    console.error(err);
  }
};

// Call averageCost after save
ApartmentSchema.post('save', function () {
  this.constructor.getAverageCost(this.property);
});

// Call averageCost before remove
ApartmentSchema.pre('remove', function () {
  this.constructor.getAverageCost(this.property);
});

module.exports = mongoose.model('Apartment', ApartmentSchema);