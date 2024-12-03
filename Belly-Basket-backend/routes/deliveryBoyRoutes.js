import express from 'express';
import { createDeliveryBoy } from '../controllers/deliveryBoyController.js';

const router = express.Router();

router.post('/create', createDeliveryBoy);

export default router;
