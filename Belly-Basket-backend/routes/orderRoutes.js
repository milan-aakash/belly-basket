import express from 'express';
import { 
  createOrder, 
  getOrders, 
  getOrderById, 
  updateOrderStatus, 
  deleteOrder, 
  verifyPayment 
} from '../controllers/orderController.js';
import  adminMiddleware  from '../middleware/adminMiddleware.js';
import  authMiddleware  from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Create a new order and initiate Razorpay payment (authenticated users)
router.post('/create', authMiddleware, createOrder);

// Verify Razorpay payment signature (authenticated users)
router.post('/verify', authMiddleware, verifyPayment);

// Get all orders (admin only)
router.get('/', adminMiddleware, getOrders);

// Get a specific order by ID (admin only)
router.get('/:id', adminMiddleware, getOrderById);

// Update the order status (admin only)
router.put('/:id/status', adminMiddleware, updateOrderStatus);

// Delete an order (admin only)
router.delete('/:id', adminMiddleware, deleteOrder);

export default router;
