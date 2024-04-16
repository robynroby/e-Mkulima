import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './loadingScreen.css';

const LoadingScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = location.state?.cartItems;

    const handleBack = () => {
        navigate("/checkout");
    };

    useEffect(() => {
        console.log("Placing order...");
        console.log(cartItems);
        const timer = setTimeout(() => {
            fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Authorization ": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ /* add order data if needed */ }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Order placed successfully:", data);
                    // Navigate to success page after placing order
                    navigate("/success");
                })
                .catch((error) => {
                    console.error("Error placing order:", error);
                    // Navigate to error page if order placement fails
                    navigate("/error");
                });
        }, 10000); // Wait for 10 seconds

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [navigate]);

    return (
        <div className="load-container">
            <h4>Your Request is being processed.You will receive a request to enter MPESA PIN shortly.</h4>
            {cartItems && ( // Display cart summary only if cartItems is available
                <div className="cart-summary">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            {/* <img src={item.image} alt={item.name} /> */}
                            <div>
                                <h5>{item.name}</h5>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: Ksh {item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="center">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
            <button onClick={handleBack} className='back-button'>Back to Checkout</button>
        </div>
    )
}

export default LoadingScreen