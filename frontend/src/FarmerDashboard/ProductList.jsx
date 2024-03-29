import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './productList.scss';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const firstImage = products?.img?.length > 0 ? products.img[0] : null;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const farmerName = localStorage.getItem('username');
                const response = await fetch(`http://localhost:5000/api/products/farmer/${farmerName}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            // Remove the deleted product from the state
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className='product-list'>
            <h2>Product List</h2>
            <p>Click on a product to view details</p>
            <div className='products'>
                {products.map(product => (
                    <div key={product._id} className='product-item'>
                        <Link to={`/products/${product._id}`}>
                            {firstImage && (
                                <img src={`data:image/jpeg;base64,${product.img[0]}`} alt={product.title} />
                            )}
                            <h3>{product.title}</h3>
                            <p>{product.desc}</p>
                        </Link>
                        <button className='delete-button' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
