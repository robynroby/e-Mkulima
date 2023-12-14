import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import './SingleProductPage.scss';

const SingleProductPage = () => {
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="single-product-page">
            <div className="product-images">
                <img src='img/about.jpg' alt='' />
                <img src='img/about.jpg' alt='' />
                <img src='img/about.jpg' alt='' />
                <img src='img/about.jpg' alt='' />
            </div>
            <div className="product-details">
                <h2>Tomatoes</h2>
                <p className="price">Ksh 999</p>
                <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus libero nesciunt explicabo error aliquam ducimus porro aperiam dolorum a magni?</p>
                <p className="seller">Seller: seller name</p>
                <div className="counter-comp">
                    <button className="add-to-cart">Add to Cart</button>
                    <div className="quantity-container">
                        <p className="quantity-text">Quantity</p>
                        <div className="quantity-control">
                            <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
                            <span className="quantity">{quantity}</span>
                            <button className="quantity-btn" onClick={increaseQuantity}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;
