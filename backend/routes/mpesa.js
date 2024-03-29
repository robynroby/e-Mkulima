const express = require("express");
const router=express.Router()
const {createToken,stkPush}= require("../controllers/lipanaMpesa")

router.post("/",createToken,stkPush)

module.exports=router