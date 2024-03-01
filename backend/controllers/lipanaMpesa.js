const axios = require("axios");

// Function to generate access token
const generateAccessToken = async () => {
    const consumerKey = 'OCKQbxqNA2TtBEz3rAX511G0MtpM5WBu';
    const consumerSecret = 'jnC1NkF7ocYEcWb4';
    const access_token_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const headers = {
        'Content-Type': 'application/json; charset=utf8',
    };

    const auth = {
        username: consumerKey,
        password: consumerSecret,
    };

    const response = await axios.get(access_token_url, { headers, auth });
    console.log(response.data.access_token)
    if (response.status === 200) {
        return response.data.access_token;
    } else {
        throw new Error('Failed to get access token');
    }
};

// Middleware to create token
const createToken = async (req, res, next) => {
    try {
        const token = await generateAccessToken();
        req.token = token; // Add token to request object
        next();
    } catch (error) {
        console.error('Error creating token:', error.message);
        res.status(400).json(error.message);
    }
};


const stkPush = async (req, res) => {
    const token = req.token;
    const shortCode = 174379;
    let phoneNumber = req.body.phone;
    const accountNumber = req.body.accountNumber;
    const amount = req.body.amount;

    if (phoneNumber.startsWith("0")) {
        phoneNumber = "254" + phoneNumber.slice(1);
    }
    else{
        phoneNumber = phoneNumber.slice(1);
    }


    //ECHO  THE DATA THAT WE RECEIVED FROM THE CLIENT
    console.log("Phone Number:", phoneNumber);
    console.log("Account Number:", accountNumber);
    console.log("Amount:", amount);

    const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const date = new Date();
    const timestamp =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);
    const password = new Buffer.from(shortCode + passkey + timestamp).toString(
        "base64"
    );
    const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: 174379,
        PhoneNumber: phoneNumber,
        CallBackURL: "https://mydomain.com/path",
        AccountReference: "The GreenX Group",
        TransactionDesc: "Testing stk push",
    };

    await axios
        .post(url, data, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then((data) => {
            console.log(data);
            res.status(200).json(data.data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err.message);
        });
};

module.exports = { createToken, stkPush };