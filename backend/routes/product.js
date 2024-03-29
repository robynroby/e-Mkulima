const Product = require("../models/Product");
const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { validationResult } = require('express-validator');


const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyFarmer
} = require("./verifyToken");

const router = require("express").Router();

// Create a new product
router.post("/", verifyFarmer, upload.array('img', 5), async (req, res) => {
    const { title, desc, price, category, location } = req.body;
    const images = req.files.map(file => file.buffer);

    try {
        const newProduct = new Product({
            title,
            desc,
            img: images,
            category,
            price,
            farmerName: req.body.farmerName,
            location: JSON.parse(location)
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
router.put("/:id", verifyFarmer, async (req, res) => {
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
router.delete("/:id", verifyFarmer, verifyTokenAndAdmin, async (req, res) => {
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

    // Extract latitude and longitude from query parameters
    const { latitude: userLatitude, longitude: userLongitude } = req.query;

    console.log("Latitude:", userLatitude);
    console.log("Longitude:", userLongitude);

    // Validate user coordinates
    const errors = validationResult(req.query);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: "Invalid latitude or longitude" });
    }

    try {
        let products;

        if (qNew) {
            // Fetch only 1 product for the 'new' query
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            // Fetch products by category with pagination
            products = await Product.find({
                category: {
                    $in: [qCategory],
                },
            }).limit(limit).skip(skip);
        } else if (userLatitude && userLongitude) {
            // Fetch all products and filter those within 40km radius based on user's location

            // Assuming you have GeoJSON in the product schema
            const userLocation = {
                type: "Point",
                coordinates: [parseFloat(userLongitude), parseFloat(userLatitude)],
            };

            const query = {
                location: {
                    $geoWithin: {
                        $centerSphere: [userLocation.coordinates, 40000 / 6371000], // Convert 40km to radians
                    },
                },
            };

            products = await Product.find(query).limit(limit).skip(skip);
        } else {
            // Fetch all products with pagination
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

// GET products posted by a specific farmer
router.get('/farmer/:farmerName', async (req, res) => {
    try {
        const farmerName = req.params.farmerName;

        // Retrieve products associated with the specified farmer name from the database
        const products = await Product.find({ farmerName });

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;