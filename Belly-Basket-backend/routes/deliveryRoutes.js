import express from 'express';
import  adminMiddleware from '../middleware/adminMiddleware.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { assignDelivery, getAllDeliveries } from '../controllers/deliveryController.js';


const router = express.Router();

// Create a delivery boy (Admin only)
router.post('/create', adminMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'deliveryBoy',
    });

    await newUser.save();
    res.status(201).json({ message: 'Delivery boy created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
