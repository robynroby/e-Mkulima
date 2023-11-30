import React from 'react';
import CardProducts from './CardProducts';
import './AllProducts.scss';

const AllProducts = () => {
    const products = [
        { id: 1, name: 'Product 1', description: 'mauris in aliquam. Sit amet mauris commodo quis imperdiet massa tincidunt.', price: 10 },
        { id: 2, name: 'Product 2', description: 'mauris in aliquam. Sit amet mauris commodo quis imperdiet massa tincidunt.', price: 20 },
        { id: 3, name: 'Product 3', description: 'mauris in aliquam. Sit amet mauris commodo quis imperdiet massa tincidunt.', price: 30 },
        { id: 4, name: 'Product 4', description: 'mauris in aliquam. Sit amet mauris commodo quis imperdiet massa tincidunt.', price: 40 },
        { id: 5, name: 'Product 5', description: 'mauris in aliquam. Sit amet mauris commodo quis imperdiet massa tincidunt.', price: 50 },
        { id: 6, name: 'Product 6', description: 'mauris in aliquam. Sit amet mauris commodo quis imperdiet massa tincidunt.', price: 60 },
        { id: 7, name: 'Product 7', description: 'mauris in aliquam. Sit amet mauris commodo quis imperdiet massa tincidunt.', price: 70 },
        { id: 8, name: 'Product 8', description: 'mauris in aliquam. Sit amet mauris commodo quis imperdiet massa tincidunt.', price: 80 },
        { id: 9, name: 'Product 9', description: 'mauris in aliquam. Sit amet mauris commodo quis imperdiet massa tincidunt.', price: 90 },
    ];

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
