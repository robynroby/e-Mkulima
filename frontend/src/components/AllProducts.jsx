import React, { useState, useEffect } from 'react';
import CardProducts from './CardProducts';
import './AllProducts.scss';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Default to 'All'

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
                setLoading(false);

                // Store products in local storage
                const productIdentifiers = data.map((product) => ({ _id: product._id, title: product.title }));
                localStorage.setItem('productIdentifiers', JSON.stringify(productIdentifiers));
            } catch (error) {
                console.error('Error fetching products:', error.message);
                setLoading(false);
            }
        };

        fetchProducts();

        // Fetch products every minute
        const intervalId = setInterval(fetchProducts, 60000);
        return () => clearInterval(intervalId);

    }, []);

    // filter products by category
    const filterProductsByCategory = () => {
        console.log(products.filter((product) => product.category ));
        if (selectedCategory === 'All') {
            return products;
        }
        return products.filter((product) => product.category === selectedCategory);
    };

    if (loading) {
        return <p
            style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center',
                marginTop: '5rem',
            }
            }
        >Loading Products...</p>; // Display loading element
    }

    return (
        <div className='products-container'>
            <h2>All Products</h2>
            <hr />
            {/* add category filter */}
            <div className='categories'>
                <button className='category' onClick={() => setSelectedCategory('All')}>All</button>
                <button className='category' onClick={() => setSelectedCategory('Vegetables')}>Vegetables</button>
                <button className='category' onClick={() => setSelectedCategory('Fruits')}>Fruits</button>
                <button className='category' onClick={() => setSelectedCategory('Grains')}>Grains</button>
                <button className='category' onClick={() => setSelectedCategory('Dairy')}>Dairy</button>
                <button className='category' onClick={() => setSelectedCategory('Meat')}>Meat</button>
                <button className='category' onClick={() => setSelectedCategory('Others')}>Others</button>
            </div>

            <div className='products'>
                {filterProductsByCategory().map((product) => (
                    <CardProducts key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
