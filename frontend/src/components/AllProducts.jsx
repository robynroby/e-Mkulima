import React, { useState, useEffect } from 'react';
import CardProducts from './CardProducts';
import Pagination from './Pagination';
import './AllProducts.scss';
import ProductSkeleton from './ProductSkeleton';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCategory, setCurrentCategory] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/api/products?page=${currentPage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                console.log(data)
                setLoading(false);
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

    useEffect(() => {
        // Filter products based on current category
        if (currentCategory === 'All') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === currentCategory);
            setFilteredProducts(filtered);
        }
    }, [products, currentCategory]);

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);


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
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                    </div>
                ) : (
                    // Render product cards
                    currentItems.map((product) => (
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
