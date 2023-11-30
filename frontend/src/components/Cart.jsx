import React from 'react';
import './Cart.scss';

const Cart = () => {
    return (
        <div className="cart">
            <h2>Your Cart</h2>
            <p>Not ready to checkout? <span>Continue Shopping</span></p>
            <div className="cart-items">
                {/* Sample cart items */}
                <div className="cart-item">
                    <div className="item-details">
                        <img src="img/about.jpg" alt="" />
                    </div>
                    <div className="item-dt">
                        <span className="item-name">Product 1</span>
                        <span className="item-quantity">Quantity: 2</span>
                        <span className="item-price">KSh 1000</span>
                    </div>
                </div>
                <div className="cart-item">
                    <div className="item-details">
                        <img src="img/about.jpg" alt="" />
                    </div>
                    <div className="item-dt">
                        <span className="item-name">Product 1</span>
                        <span className="item-quantity">Quantity: 2</span>
                        <span className="item-price">KSh 999</span>
                    </div>
                </div>
            </div>
            <div className="cart-summary">
                <span className="total">Total: $35.00</span>
                <button className="checkout-button">Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
