import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  stock: { type: Number, default: 0 },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Shopkeeper who added the product
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
