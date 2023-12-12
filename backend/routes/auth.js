const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });

        if (!user) {
            return res.status(401).json("Wrong User Name");
        }

        let originalPassword;
        try {
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );
            originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error('Password decryption error:', error);
            return res.status(500).json('Error during password decryption');
        }

        const inputPassword = req.body.password;

        if (originalPassword !== inputPassword) {
            return res.status(401).json("Wrong Password");
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json('Internal server error');
    }
});


module.exports = router;