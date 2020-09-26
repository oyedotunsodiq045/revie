const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
  path: './config/config.env'
});

// Load models
const Property = require('./models/Property');
const Apartment = require('./models/Apartment');
const User = require('./models/User');
// const Review = require('./models/Review');

// Connect to DB
// mongoose.connect(process.env.MONGO_URI, {
mongoose.connect(process.env.LOCAL_MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const properties = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/properties.json`, 'utf-8')
);

const apartments = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/apartments.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
// );

// Import into DB
const importData = async () => {
  try {
    await Property.create(properties);
    await Apartment.create(apartments);
    await User.create(users);
    // await Review.create(reviews);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Property.deleteMany();
    await Apartment.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}