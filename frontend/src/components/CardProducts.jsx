import React from 'react';
import './CardProducts.scss'

const CardProducts = ({ product }) => {
    const firstImage = product.img.length > 0 ? product.img[0] : null;

    return (
        <div className="card">
            <div className="image">
                {firstImage && (
                    <img src={`data:image/jpeg;base64,${product.img[0]}`} alt="Product" />
                )}
            </div>
            <div className="card-body">
                <h5 className="title">{product.title}</h5>
                <p className="price">Ksh {product.price}</p>
            </div>
        </div>
    );
};

export default CardProducts;
