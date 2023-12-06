import React from 'react';
import './Cart.scss';

const Cart = () => {
    return (
        <div className="cart">
            <div className="cart-items">
                {/* Sample cart items */}
                <div className="cart-item">
                    <div className="item-details">
                        <img src="img/about.jpg" alt="" />
                    </div>
                    <div className="item-dt">
                        <span className="item-name">Product 1</span>
                        <span className="item-quantity">Quantity: 2</span>
                        <div className="item-by">
                            <span className="item-price">KSh 999</span>
                            <span className="item-seller">Sold by: Seller 1</span>
                        </div>
                        <a href="#" className="remove-link">Remove</a>
                    </div>
                </div>
                <div className="cart-item">
                    <div className="item-details">
                        <img src="img/about.jpg" alt="" />
                    </div>
                    <div className="item-dt">
                        <span className="item-name">Product 1</span>
                        <span className="item-quantity">Quantity: 2</span>
                        <div className="item-by">
                            <span className="item-price">KSh 999</span>
                            <span className="item-seller">Sold by: Seller 1</span>
                        </div>
                        <a href="#" className="remove-link">Remove</a>
                    </div>
                </div>
            </div>
            <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="totals">
                    <div className="subtotal total-space">
                        <span className="label">Subtotal</span>
                        <span className="amount">Ksh 1,999</span>
                    </div>
                    <div className="shipping total-space">
                        <span className="label">Shipping</span>
                        <span className="amount">Ksh 100</span>
                    </div>
                    <hr className="separator-line" />
                    <div className="total total-space">
                        <span className="label">Total</span>
                        <span className="amount">Ksh 2,009</span>
                    </div>
                </div>
                <button className="checkout-button">Continue to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
