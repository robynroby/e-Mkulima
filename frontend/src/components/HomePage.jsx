import { useNavigate } from 'react-router-dom';
import './HomePage.scss';

const HomePage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/products/page/1');
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

                <div className="featured-products">
                    <h2>Featured Products</h2>
                    <p>Explore our handpicked selection of top-rated products.</p>
                    {/* Add your featured products carousel or grid here */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
