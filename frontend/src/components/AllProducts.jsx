import { useEffect, useState } from 'react';
import './AllProducts.scss';
import CardProducts from './CardProducts';
import Pagination from './Pagination';
import ProductSkeleton from './ProductSkeleton';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCategory, setCurrentCategory] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/products?page=${currentPage}&latitude=${userLatitude}&longitude=${userLongitude}`, {
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
            localStorage.setItem('products', JSON.stringify(data));
        };

        fetchProducts();

        // Fetch products every minute
        const intervalId = setInterval(fetchProducts, 60000);
        return () => clearInterval(intervalId);
    }, [currentPage, userLatitude, userLongitude]);

    useEffect(() => {
        // Filter products based on current category
        if (currentCategory === 'All') {
            setFilteredProducts(products);
        } else {
            const regex = new RegExp(currentCategory, 'i'); // Case-insensitive matching
            const filtered = products.filter(product => regex.test(product.category));
            setFilteredProducts(filtered);
        }
    }, [products, currentCategory]);

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        // Get user's location
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        setUserLatitude(position.coords.latitude);
                        setUserLongitude(position.coords.longitude);
                    },
                    function (error) {
                        console.error("Error getting user location:", error);
                    }
                );
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        };

        getUserLocation();
    }, []);

    return (
        <div className='products-container'>
            <h2>All Products</h2>
            <hr />
            <div className='categories'>
                <button className='category' onClick={() => handleCategoryChange('All')}>All</button>
                <button className='category' onClick={() => handleCategoryChange('Vegetables')}>Vegetables</button>
                <button className='category' onClick={() => handleCategoryChange('Fruits')}>Fruits</button>
                <button className='category' onClick={() => handleCategoryChange('Grains')}>Grains</button>
                <button className='category' onClick={() => handleCategoryChange('Dairy')}>Dairy</button>
                <button className='category' onClick={() => handleCategoryChange('Meat')}>Meat</button>
                <button className='category' onClick={() => handleCategoryChange('Others')}>Others</button>
            </div>
            <div className="products">
                {loading ? (
                    <div className='skeleton-container'>
                        {[...Array(itemsPerPage)].map((_, index) => (
                            <ProductSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <CardProducts key={product._id} product={product} />
                    ))
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default AllProducts;
