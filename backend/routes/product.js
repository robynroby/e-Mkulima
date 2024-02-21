const Product = require("../models/Product");
const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// creaate a new product
router.post("/", verifyTokenAndAdmin, upload.array('img', 5), async (req, res) => {
    const { title, desc, price, category } = req.body;
    const images = req.files.map(file => file.buffer);

    try {
        const newProduct = new Product({
            title,
            desc,
            img: images,
            category,
            price,
            farmerName: req.user.username,
        });

        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: "Duplicate product title. Choose a unique title." });
        } else {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        // Convert image buffers to base64 strings
        const productWithBase64Images = {
            ...product._doc,
            img: product.img.map(imageBuffer => imageBuffer.toString('base64')),
        };

        res.status(200).json(productWithBase64Images);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            }).limit(limit).skip(skip);
        } else {
            products = await Product.find().limit(limit).skip(skip);
        }

        // Convert image buffers to base64 strings
        const productsWithBase64Images = products.map(product => ({
            ...product._doc,
            img: product.img.map(imageBuffer => imageBuffer.toString('base64')),
        }));

        res.status(200).json(productsWithBase64Images);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;