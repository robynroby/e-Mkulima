import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.scss';

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleredirect = () => {
        navigate("/cart");
    };

    // const handleLoadingScreen = () => {
    //     navigate("/loading", { state: { cartItems } }); // Pass cart items to the loading screen
    // };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const initialAmount = calculateTotal() * 0.4;

    useEffect(() => {
        // Fetch cart data
        const fetchCartData = async () => {
            try {
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

                // Fetch details for each product in the cart
                const productDetailsPromises = productsInCart.map(async (product) => {
                    const productResponse = await fetch(`http://localhost:5000/api/products/find/${product.productId}`);
                    const productData = await productResponse.json();
                    return {
                        ...productData,
                        quantity: product.quantity,
                    };
                });

                const productsWithDetails = await Promise.all(productDetailsPromises);

                setCartItems(productsWithDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart data:', error.message);
                setLoading(false);
            }
        };

        fetchCartData();
    }, []);

    const handlePay = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const orderData = {
                userId: localStorage.getItem('userId'),
                products: cartItems.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                })),
                amount: initialAmount,
                address: address,
                status: "pending",
            };

            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Error placing order');
            }

            const data = await response.json();
            console.log("Order placed successfully:", data);

            // setMessage("Order placed successfully!");
            // handleLoadingScreen();
        } catch (error) {
            console.error("Error placing order:", error);
            setMessage('Payment failed! Please try again.');
        }
    
        fetch("http://localhost:5000/api/mpesa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone: phone, amount: calculateTotal() }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMessage("Enter your pin to complete the transaction.", data.CustomerMessage);
                // handleLoadingScreen();
            })
            .catch((error) => {
                console.error(error);
                setMessage('Payment failed! please try again.');
            });
        
    };
    return (
        <div className="checkout-page">
            {/* Personal Information Form */}
            <form onSubmit={handlePay} className="personal-info-form">
                <h1>Checkout</h1>
                <h2>Payment Information</h2>
                {message && <p className='error-message' style={{ color: message.includes('failed') ? '#FF000024' : '#4BB543' }}>{message}</p>}
                <div className="form-group">
                    <div className="horizontal-inputs">
                        <div className="input-group">
                            <input type="text" placeholder="First Name" id="firstName" />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Last Name" id="lastName" />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Address"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                {loading ? (
                    <button className="pay-button" disabled>
                        Loading...
                    </button>
                ) : (
                    
                        <div className='pay-msg'>
                            <p>You are required to pay 40% of the total amount as initial payment.</p>
                            <p>Pay the final amount after you receive the payments</p>
                            <p>Click the button below to pay <span>Ksh {initialAmount}</span></p>
                            <button className="pay-button">Pay Initial Amount</button>
                        </div>
                )}
            </form>

            {/* Cart Summary */}
            <div className="cart-summary">
                <div className="cart-header">
                    <h2>Cart Summary</h2>
                    <button className="back-button" onClick={handleredirect}>back to cart</button>
                </div>
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={`data:image/jpeg;base64,${item.img[0]}`} alt={item.title} />
                        <div className="item-details">
                            <div className="item-name">{item.title}</div>
                            <div className="quantity">Quantity: {item.quantity}</div>
                            <div className="item-quantity-price">
                                <div className="price">Ksh {item.price}</div>
                                <div className="seller">product seller: <span>{item.farmerName}</span></div>
                            </div>
                        </div>
                    </div>
                ))}
                <hr className="separator-line" />
                <div className="shipping total-space">
                    <span className="label">Shipping</span>
                    <span className="amount">Ksh {0 /* shipping */}</span>
                </div>
                <hr className="separator-line" />
                <div className="total">
                    <div className="total-text">Total</div>
                    <div className="total-price">Ksh {calculateTotal()}</div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;