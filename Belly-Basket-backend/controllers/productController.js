import Product from '../models/Product.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, shopId } = req.body;

    // Check if the user is a shopkeeper
    if (req.user.role !== 'shopkeeper') {
      return res.status(403).json({ message: 'Access denied. Only shopkeepers can add products.' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      shopId,
      addedBy: req.user.id,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Remove a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user is the shopkeeper who added the product
    if (req.user.role !== 'shopkeeper' || product.addedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied. You can only remove your own products.' });
    }

    await product.remove();

    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product', error: error.message });
  }
};
