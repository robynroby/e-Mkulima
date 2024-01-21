const mongoose = require("mongoose");
const validator = require('validator');

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true, },
        img: { type: String, required: true, validate: { validator: validator.isURL, message: 'Invalid URL' } },
        // categories: { type: Array },
        // size: { type: String },
        // color: { type: String },
        price: { type: Number, required: true },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);