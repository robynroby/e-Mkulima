import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SingleProductPage.scss';

const SingleProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [productDetails, setProductDetails] = useState({});
    const { id } = useParams();

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    useEffect(() => {
        // Function to fetch product details from the server
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/find/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                // Set the product details in state
                setProductDetails(data);
                console.log(data.img); // Log img data

                // Store product details in local storage
                localStorage.setItem('productDetails', JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching product details:', error.message);
            }
        };

        // Fetch product details when the component mounts
        fetchProductDetails();

        // Set up an interval to fetch product details periodically (e.g., every 1 minute)
        const intervalId = setInterval(fetchProductDetails, 60000); // 60000 milliseconds = 1 minute

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [id]);

    return (
        <div className="single-product-page">
            <div className="product-images">
                {productDetails.img && productDetails.img.slice(0, 4).map((image, index) => (
                    <div className="image" key={index}>
                        <img src={`data:image/jpeg;base64,${image}`} alt={productDetails.title} />
                    </div>
                ))}
            </div>
            <div className="product-details">
                <h2>{productDetails.title}</h2>
                <p className="price">Ksh {productDetails.price}</p>
                <p className="description">{productDetails.desc}</p>
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
