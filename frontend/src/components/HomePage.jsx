import React from 'react';
import './HomePage.scss';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/products');
    }
    
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

                {/* Sample Products Grid */}
                <div className="products-grid">
                    <div className="card">
                        <div className="image">
                            <img src='img/about.jpg' alt='' />
                        </div>
                        <div className="card-body">
                            <h5 className="title">Prodict name</h5>
                            <p className="price">Ksh 200</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image">
                            <img src='img/about.jpg' alt='' />
                        </div>
                        <div className="card-body">
                            <h5 className="title">Prodict name</h5>
                            <p className="price">Ksh 200</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image">
                            <img src='img/about.jpg' alt='' />
                        </div>
                        <div className="card-body">
                            <h5 className="title">Prodict name</h5>
                            <p className="price">Ksh 200</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image">
                            <img src='img/about.jpg' alt='' />
                        </div>
                        <div className="card-body">
                            <h5 className="title">Prodict name</h5>
                            <p className="price">Ksh 200</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image">
                            <img src='img/about.jpg' alt='' />
                        </div>
                        <div className="card-body">
                            <h5 className="title">Prodict name</h5>
                            <p className="price">Ksh 200</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image">
                            <img src='img/about.jpg' alt='' />
                        </div>
                        <div className="card-body">
                            <h5 className="title">Prodict name</h5>
                            <p className="price">Ksh 200</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
