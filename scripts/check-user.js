const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGO_URI;

async function checkUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define a simple user schema for this script
    const User = mongoose.model('User', new mongoose.Schema({
      email: String,
      username: String,
      password: String,
      createdAt: Date,
      updatedAt: Date
    }));

    // Find the test user
    const user = await User.findOne({ email: 'test@example.com' });
    console.log('Found user:', user);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUser();
