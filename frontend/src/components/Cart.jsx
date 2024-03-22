import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 100;
    const total = subtotal + shipping;

    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                // Replace 'userId' with the actual user ID (you can get it from the authentication process)
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');

                const cartResponse = await fetch(`http://localhost:5000/api/carts/find/${userId}`, {
                    headers: {
                        'token': `Bearer ${token}`,
                    },
                });

                if (!cartResponse.ok) {
                    throw new Error('Failed to fetch user cart');
                }

                const cartData = await cartResponse.json();
                const productsInCart = cartData.products;
                console.log(productsInCart);

                // Fetch details for each product in the cart
                const productDetailsPromises = productsInCart.map(async (product) => {
                    const productResponse = await fetch(`http://localhost:5000/api/products/find/${product.productId}`);
                    const productData = await productResponse.json();
                    return {
                        ...productData,
                        quantity: product.quantity,
                    };
                });

                // Wait for all product details to be fetched
                const productsWithDetails = await Promise.all(productDetailsPromises);

                setCart(productsWithDetails);
                console.log(productsWithDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart data:', error.message);
                setLoading(false);
            }
        };

        fetchCartData();
    }, []);

    const handleRemoveItem = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) {
                throw new Error('User not authenticated');
            }

            const cartResponse = await fetch(`http://localhost:5000/api/carts/find/${userId}`, {
                headers: {
                    'token': `Bearer ${token}`,
                },
            });

            if (!cartResponse.ok) {
                throw new Error('Failed to fetch user cart');
            }

            const cartData = await cartResponse.json();
            console.log('Cart data:', cartData);

            // If the cart exists, update it; otherwise, create a new cart
            const cartId = cartData ? cartData._id : null;

            const cartPayload = {
                userId,
                products: [
                    {
                        productId,
                    },
                ],
            };

            const response = await fetch(`http://localhost:5000/api/carts/remove/${cartId ? cartId : ''}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`,
                },
                body: JSON.stringify(cartPayload),
            });

            if (!response.ok) {
                throw new Error('Failed to remove product from cart');
            }

            const updatedCartData = await response.json();
            console.log('Updated cart data:', updatedCartData);

            // Now, you might want to update the cart state in the component
            // or simply let the next fetchCartData call refresh the data
        } catch (error) {
            console.error('Error removing product from cart:', error.message);
        }
    };


    if (loading) {
        return <p
            style={
                {
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
                    marginTop: '5rem',
                }
            }
        >Cart Loading...</p>;
    }

    if (!cart.length) {
        return <p
            style={{
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginTop: '5rem',
            }
            }
        >Your cart is empty</p>;
    }

    return (
        <div className="cart">
            <div className="cart-items">
                {cart.map((item) => (
                    <div className="cart-item" key={item.productId}>
                        <div className="item-details">
                            {item.img && item.img[0] && (
                                <img src={`data:image/jpeg;base64,${item.img[0]}`} alt={item.title} />
                            )}
                        </div>
                        <div className="item-dt">
                            <span className="item-name">{item.title}</span>
                            <span className="item-quantity">Quantity: {item.quantity}</span>
                            <div className="item-by">
                                <span className="item-price">Ksh {item.price * item.quantity}</span>
                                <span className="item-seller">Sold by: {item.farmerName}</span>
                            </div>
                            <button className='remove-link' onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="totals">
                    <div className="subtotal total-space">
                        <span className="label">Subtotal</span>
                        <span className="amount">Ksh {subtotal}</span>
                    </div>
                    <div className="shipping total-space">
                        <span className="label">Shipping</span>
                        <span className="amount">Ksh {shipping}</span>
                    </div>
                    <hr className="separator-line" />
                    <div className="total total-space">
                        <span className="label">Total</span>
                        <span className="amount">Ksh {total}</span>
                    </div>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>Continue to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
