const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    imageUrl: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
