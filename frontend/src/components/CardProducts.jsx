import { useNavigate } from 'react-router-dom';
import './CardProducts.scss';
import './productskeleton.scss'; 
import ProductSkeleton from './ProductSkeleton';

const CardProducts = ({ product, isLoading }) => {
    const firstImage = product?.img?.length > 0 ? product.img[0] : null;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/products/${product._id}`);
    };

    return (
        <div className={`card ${isLoading ? 'product-skeleton' : ''}`} onClick={handleClick}>
            {isLoading ? ( // Render skeleton if isLoading is true
                <ProductSkeleton />
            ) : (
                <>
                    <div className="image">
                        {firstImage && (
                            <img src={`data:image/jpeg;base64,${product.img[0]}`} alt={product.title} />
                        )}
                    </div>
                    <div className="card-body">
                        <h5 className="title">{product.title}</h5>
                        <p className="price">Ksh {product.price}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default CardProducts;