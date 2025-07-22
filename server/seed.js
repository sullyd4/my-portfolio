import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected...');

    const adminEmail = 'admin@example.com';
    const adminPassword = 'your-secure-password';
    const adminName = 'Solomon Daini';

    let user = await User.findOne({ email: adminEmail });

    if (user) {
      console.log('Admin user already exists.');
      mongoose.connection.close();
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    user = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
    });

    await user.save();
    console.log('Admin user created successfully!');

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedUser();