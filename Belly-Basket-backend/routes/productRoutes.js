import express from 'express';
import { createProduct, deleteProduct } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Shopkeeper routes
router.post('/create', authMiddleware, createProduct); // Add product
router.delete('/:id', authMiddleware, deleteProduct); // Remove product

export default router;
