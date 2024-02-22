import React, { useState, useEffect } from 'react';
import './Checkout.scss';

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                // Replace 'userId' with the actual user ID (you can get it from the authentication process)
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');

                const cartResponse = await fetch(`http://localhost:5000/api/carts/find/${userId}`, {
                    headers: {
                        'token': `Bearer ${token}`,
                    },
                });

                if (!cartResponse.ok) {
                    throw new Error('Failed to fetch user cart');
                }

                const cartData = await cartResponse.json();
                const productsInCart = cartData.products;
                console.log(productsInCart);

                // Fetch details for each product in the cart
                const productDetailsPromises = productsInCart.map(async (product) => {
                    const productResponse = await fetch(`http://localhost:5000/api/products/find/${product.productId}`);
                    const productData = await productResponse.json();
                    return {
                        ...productData,
                        quantity: product.quantity,
                    };
                });

                // Wait for all product details to be fetched
                const productsWithDetails = await Promise.all(productDetailsPromises);

                setCartItems(productsWithDetails);
                console.log(productsWithDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart data:', error.message);
                setLoading(false);
            }
        };

        fetchCartData();
    }, []);


    const calculateTotal = () => {
        // Calculate the total price of items in the cart
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };
    

    const removeItemFromCart = async (productId) => {
        try {
            // Make a DELETE request to remove the item from the cart
            const response = await fetch(`http://localhost:5000/api/carts/${productId}`, {
                method: 'DELETE',
                // Include any necessary headers (e.g., authorization token)
            });

            if (response.ok) {
                // Update the cart items after successful deletion
                setCartItems(cartItems.filter(item => item._id !== productId));
            } else {
                console.error('Error deleting item from cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    const [phone, setPhone] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    };
    const handleCalculateTotal = () => {
        const totalAmount = calculateTotal();
        setAmount(totalAmount);
    };

    useEffect(() => {
        handleCalculateTotal();
    }, [cartItems]);


    const handlePay = (e) => {
        console.log(amount)
        console.log(phone)
        e.preventDefault();
        fetch("http://localhost:5000/api/stkpush", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone: phone, accountNumber: accountNumber, amount: amount }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMessage('Payment successful!');
            })
            .catch((error) => {
                console.error(error);
                setMessage('Payment failed!');
            });
    };

    return (
        <div className="checkout-page">
            {/* Personal Information Form */}
            <form onSubmit={handlePay} className="personal-info-form">
                <h1>Checkout</h1>
                <h2>Payment Information</h2>
                {message && <p style={{ color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
                <div className="form-group">
                    <div className="horizontal-inputs">
                        <div className="input-group">
                            <input type="text" placeholder="First Name" id="firstName" />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Last Name" id="lastName" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="accountNumber"
                        value={accountNumber}
                        onChange={handleAccountNumberChange}
                        placeholder='Account Number'
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="City" id="city" />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                    />
                </div>
                <button className="pay-button">Pay</button>
            </form>

            {/* Cart Summary */}
            <div className="cart-summary">
                <h2>Cart Summary</h2>
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={`data:image/jpeg;base64,${item.img[0]}`} alt={item.title} />
                        <div className="item-details">
                            <div className="item-name">{item.title}</div>
                            <div className="quantity">Quantity: {item.quantity}</div>
                            <div className="item-quantity-price">
                                <div className="price">Ksh{item.price}</div>
                                <div className="seller">product seller</div>
                            </div>
                            <button className="remove-button">Remove</button>
                        </div>
                    </div>

                ))}
                <hr className="separator-line" />
                <div className="total">
                    <div className="total-text">Total</div>
                    <div className="total-price">Ksh {calculateTotal()}</div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
