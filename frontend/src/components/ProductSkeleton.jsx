import React from 'react';
import './productskeleton.scss';

const ProductSkeleton = () => {
    return (
        <div className="product-skeleton">
            <div className="image-skeleton" />
            <div className="title-skeleton" />
            <div className="price-skeleton" />
        </div>
    );
};

export default ProductSkeleton;