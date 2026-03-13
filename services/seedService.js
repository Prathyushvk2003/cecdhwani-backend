const Admin = require('../models/Admin');

/**
 * Automatically seeds the default admin user if it doesn't exist.
 */
const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });
    
    if (adminExists) {
      console.log('✅ Admin user already exists');
      return;
    }

    const admin = new Admin({
      username: 'admin',
      email: 'admin@dhwani.com',
      password: 'admin' // This will be hashed by the model's pre-save hook
    });

    await admin.save();
    console.log('🚀 Default admin seeded successfully. Username: admin, Password: admin');
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
  }
};

module.exports = { seedAdmin };
