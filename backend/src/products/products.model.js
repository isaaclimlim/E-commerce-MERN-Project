const { Schema, model, default: mongoose } = require('mongoose');

// Define the Product Schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
        default: null,
    },
    image: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User", 
        required: true,
    },
});

// Create and export the Product model
const Products = mongoose.model("Product", ProductSchema);

module.exports = Products;
 