const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");
const lipanaMpesa = require("./routes/mpesa");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/mpesa", lipanaMpesa);

app.post("/callback", (req, res) => {
    const callbackData = req.body;
    console.log(callbackData);
    console.log("Callback received");
});




// test





app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});




































// password:UfJRrKCUp4yp5S6u