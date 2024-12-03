import express from 'express';
import { createShop, getShops, deleteShop } from '../controllers/shopController.js';

const router = express.Router();

router.post('/create', createShop);
router.get('/', getShops);
router.delete('/delete/:shopId', deleteShop);  // DELETE route for shop

export default router;
