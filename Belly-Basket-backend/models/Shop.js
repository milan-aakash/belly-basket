import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },         
  email: { type: String, required: true, unique: true }, 
  shopName: { type: String, required: true },      
  location: { type: String, required: true },      
  password: { type: String, required: true },      
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
}, {
  timestamps: true, 
});

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
