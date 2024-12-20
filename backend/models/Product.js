const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        img: [{ type: Buffer, required: true }],
        category: {
            type: String,
            required: [true, 'Please select category for this product'],
            enum: {
                values: [
                    'grains',
                    'fruits',
                    'vegetables',
                    'meat',
                    'dairy',
                ],
                message: 'Please select correct category for product'
            }
        },
        farmerName: { type: String, required: true },
        price: { type: Number, required: true },
        location: {
            type: { type: String, enum: ['Point'], default: 'Point' },
            coordinates: { type: [Number], required: true },
        }
    },
    { timestamps: true }
);

ProductSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Product", ProductSchema);
