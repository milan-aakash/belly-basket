import { adminMiddleware } from '../middleware/adminMiddleware.js';  // Import the adminMiddleware
import bcrypt from 'bcryptjs';
import Shop from '../models/Shop.js';

// Create a new shop
export const createShop = async (req, res) => {
  try {
    const { name, email, shopName, location, password } = req.body;

    // Check if a shop with the same email already exists
    const shopExist = await Shop.findOne({ email });
    if (shopExist) {
      return res.status(400).json({ message: 'Shop with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newShop = new Shop({
      name,
      email,
      shopName,
      location,
      password: hashedPassword,
    });

    await newShop.save();

    res.status(201).json({ message: 'Shop created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating shop', error: error.message });
  }
};

// Get all shops
export const getShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shops' });
  }
};

// Delete a shop
export const deleteShop = async (req, res) => {
  try {
    const { shopId } = req.params;

    // Check if the shop exists
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    // Delete the shop
    await Shop.findByIdAndDelete(shopId);
    res.status(200).json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shop', error: error.message });
  }
};
