const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review']
  },
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10']
  },
  property: {
    type: mongoose.Schema.ObjectId,
    ref: 'Property',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Prevent user from submitting more than one review per property
ReviewSchema.index({
  property: 1,
  user: 1
}, {
  unique: true
});

// Static method to get avg of rating and save
ReviewSchema.statics.getAverageRating = async function (propertyId) {
  // console.log('Calculating avg rating...'.blue);
  const obj = await this.aggregate([{
      $match: {
        property: propertyId
      }
    },
    {
      $group: {
        _id: '$property',
        averageRating: {
          $avg: '$rating'
        }
      }
    }
  ]);

  try {
    await this.model('Property').findByIdAndUpdate(propertyId, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.error(err);
  }
};

// Call averageRating after save
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.property);
});

// Call averageRating before remove
ReviewSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.property);
});

module.exports = mongoose.model('Review', ReviewSchema);