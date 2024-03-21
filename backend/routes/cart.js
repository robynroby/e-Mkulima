const Cart = require("../models/Cart");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/remove/:_id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have middleware to extract user ID from the request
        const _id = req.params._id;

        // Find the user's cart and remove the specified product
        const cart = await Cart.findOneAndUpdate(
            { userId: userId },
            { $pull: { products: { _id: _id } } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json({ message: 'Item removed from cart successfully', cart: cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Check if the product already exists in the cart
        const existingProduct = cart.products.find(
            (product) => product.productId === req.body.products[0].productId
        );

        if (existingProduct) {
            // If the product exists, update its quantity
            existingProduct.quantity += req.body.products[0].quantity;
        } else {
            // If the product doesn't exist, add it to the cart
            cart.products.push(req.body.products[0]);
        }

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;