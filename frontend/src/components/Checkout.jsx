import React from 'react';
import './Checkout.scss';

const CheckoutPage = () => {
    // Sample data for the cart items
    const cartItems = [
        {
            id: 1,
            name: 'Product 1',
            quantity: 2,
            price: 50,
            seller: 'Sample Seller 1',
            image: 'img/about.jpg',
        },
        {
            id: 2,
            name: 'Product 2',
            quantity: 1,
            price: 30,
            seller: 'Sample Seller 2',
            image: 'img/about.jpg',
        },
        // Add more items as needed
    ];

    const calculateTotal = () => {
        // Calculate the total price of items in the cart
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    return (
        <div className="checkout-page">
            {/* Personal Information Form */}
            <div className="personal-info-form">
                <h1>Checkout</h1>
                <h2>Payment Information</h2>
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
                    <input type="text" placeholder="Address" id="address" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="City" id="city" />
                </div>
                <div className="form-group">
                    <input type="tel" placeholder="Phone Number" id="phone" />
                </div>
                <button className="pay-button">Pay</button>
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
                <h2>Cart Summary</h2>
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                            <div className="item-name">{item.name}</div>
                            <div className="quantity">Quantity: {item.quantity}</div>
                                <div className="item-quantity-price">
                                    <div className="price">Ksh{item.price}</div>
                                    <div className="seller">{item.seller}</div>
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
