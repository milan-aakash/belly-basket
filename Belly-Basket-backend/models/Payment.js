import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
