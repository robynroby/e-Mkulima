import React from 'react';
import './CardProducts.scss'

const CardProducts = ({ product }) => {
    return (
        <div className="card">
            <div className="image">
                <img src='img/about.jpg' alt='' />
            </div>
            <div className="card-body">
                <h5 className="title">{product.title}</h5>
                <p className="price">Ksh {product.price}</p>
            </div>
        </div>
    );
};

export default CardProducts;
