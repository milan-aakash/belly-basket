import express from 'express';
import { placeOrder, getCustomerOrders } from '../controllers/customerController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/order', authMiddleware, placeOrder);
router.get('/orders/:customerId', authMiddleware, getCustomerOrders);

export default router;
