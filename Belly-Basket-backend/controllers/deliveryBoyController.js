import bcrypt from 'bcryptjs';
import DeliveryBoy from '../models/DeliveryBoy.js';

// Create a new delivery boy
export const createDeliveryBoy = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const deliveryBoyExist = await DeliveryBoy.findOne({ email });
    if (deliveryBoyExist) {
      return res.status(400).json({ message: 'Delivery boy with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDeliveryBoy = new DeliveryBoy({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newDeliveryBoy.save();

    res.status(201).json({ message: 'Delivery boy created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating delivery boy', error: error.message });
  }
};
