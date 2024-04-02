const express = require("express");
const router = express.Router()
const { createToken, stkPush } = require("../controllers/lipanaMpesa")

router.post("/", createToken, stkPush)

router.post("api/mpesa/callback", (req, res) => {
    const data = JSON.stringify(req.body);
    fs.appendFile('test.json', data, (err) => {
        if (err) throw err;
        console.log('Data appended to test.json');
    });
    res.send('Data received successfully');
});
module.exports = router