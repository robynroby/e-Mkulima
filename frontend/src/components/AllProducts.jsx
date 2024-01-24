import React, { useState, useEffect } from 'react';
import CardProducts from './CardProducts';
import './AllProducts.scss';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
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
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='products-container'>
            <h2>All Products</h2>
            <hr />
            <div className='products'>
                {products.map((product) => (
                    <CardProducts key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
