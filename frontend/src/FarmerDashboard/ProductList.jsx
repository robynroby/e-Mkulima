import React from 'react';
import { Link } from 'react-router-dom';
import './productList.scss';

const ProductList = () => {
    return (
        <div className='product-list'>
            <h2>Product List</h2>
            <ul>
                <li>
                    <Link to="#">Product 1</Link>
                </li>
                <li>
                    <Link to="#">Product 2</Link>
                </li>
                <li>
                    <Link to="#">Product 3</Link>
                </li>
            </ul>
        </div>
    );
};

export default ProductList;
