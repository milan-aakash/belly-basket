import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  deliveryBoyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  status: { type: String, required: true },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;
