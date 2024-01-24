import React, { useState, useEffect } from 'react';
import CardProducts from './CardProducts';
import './AllProducts.scss';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Function to fetch products from the server
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:5000/api/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setProducts(data);

                // Store products in local storage
                localStorage.setItem('products', JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        // Fetch products when the component mounts
        fetchProducts();

        // Set up an interval to fetch products periodically (e.g., every 1 minute)
        const intervalId = setInterval(fetchProducts, 60000); // 60000 milliseconds = 1 minute

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='products-container'>
            <h2>All Products</h2>
            <hr />
            <div className='products'>
                {products.map((product) => (
                    <CardProducts key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
