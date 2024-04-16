import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import './productList.scss';

const ProductList = () => {
    const [products, setProducts] = useState([]);

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
            {/* <p>Click on a product to view details</p> */}
            <table className='products-table'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>
                                {product.img.length > 0 && (
                                    <img src={`data:image/jpeg;base64,${product.img[0]}`} alt={product.title} />
                                )}
                            </td>
                            <td>{product.title}</td>
                            <td>{product.desc}</td>
                            <td>
                                <button className='delete-button' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
