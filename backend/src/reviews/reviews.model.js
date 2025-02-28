const mongoose = require('mongoose');
//const Products = require('../products/products.model');

// Define the Review Schema
const ReviewSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    },
    { timestamps: true }
);

// Create and export the Review model
const Reviews = mongoose.model("Review", ReviewSchema);

module.exports = Reviews;
