import Order from '../models/Order.js';

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const { customerId, products, totalAmount } = req.body;

    const order = new Order({
      customerId,
      products,
      totalAmount,
      status: 'Pending',
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order' });
  }
};

// Get customer orders
export const getCustomerOrders = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await Order.find({ customerId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};
