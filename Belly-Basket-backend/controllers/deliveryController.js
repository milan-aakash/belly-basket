import Delivery from '../models/Delivery.js';

// Assign delivery
export const assignDelivery = async (req, res) => {
  try {
    const { deliveryBoyId, orderId, status } = req.body;

    const delivery = new Delivery({
      deliveryBoyId,
      orderId,
      status,
    });

    await delivery.save();

    res.status(201).json({ message: 'Delivery assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning delivery' });
  }
};

// Get all deliveries
export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deliveries' });
  }
};
