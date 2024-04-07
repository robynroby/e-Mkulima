const express = require("express");
const router = express.Router();
const { createToken, stkPush } = require("../controllers/lipanaMpesa");

// Middleware to parse JSON body
router.use(express.json());

router.post("/", createToken, stkPush);


module.exports = router;
