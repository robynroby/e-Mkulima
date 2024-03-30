// import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';

const HomePage = () => {
    const navigate = useNavigate();
   
    const featuredProducts = [
        {
            id: 1,
            name: 'Avacados springs',
            description: 'High quality avacados from the farm.',
            price: 49.99,
            image: './img/product/1.png',
        },
        {
            id: 2,
            name: 'Lettuce',
            description: 'Fresh lettuce from the farm.',
            price: 79.99,
            image: './img/product/2.png',
        },
        {
            id: 3,
            name: 'Fresh Eggs',
            description: 'Organic fresh eggs from the farm.',
            price: 99.99,
            image: './img/product/3.png',
        },
    ];


    const handleRedirect = () => {
        navigate('/products/page/1');
    };

    return (
        <div className="home-page">
            {/* Banner Section */}
            <div className="banner">
                <div className="overlay"></div>
                <div className="banner-content">
                    <h1>Welcome to Our Store</h1>
                    <p>Discover Amazing Products for Your Lifestyle</p>
                </div>
            </div>

            {/* Products Section */}
            <div className="products-section">
                <h2>Products</h2>
                <p>Explore our curated collection of high-quality products.</p>
                <button className="shop-all-button" onClick={handleRedirect}>Shop All</button>

                <div className="featured-products">
                    <h2>Featured Products</h2>
                    <p>Explore our handpicked selection of top-rated products.</p>
                    {/* this should be a caurosel with sliding products  */}
                    <div className="featured-products-list">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="featured-product">
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                {/* <p>{product.description}</p> */}
                                <p>Ksh {product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
