const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const { seedAdmin } = require('./services/seedService');

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/artsfest');

    // Find and delete existing admin
    await Admin.deleteOne({ username: 'admin' });
    console.log('🗑️ Deleted existing admin user');

    // Create new admin with default credentials
    await seedAdmin();
    
    console.log('✅ Admin password reset successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting admin password:', error);
    process.exit(1);
  }
};

resetAdminPassword();
