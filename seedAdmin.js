const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { seedAdmin } = require('./services/seedService');

dotenv.config();

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/artsfest');
    await seedAdmin();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

runSeed();
