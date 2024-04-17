import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentRemainderPage.scss';

const PaymentRemainderPage = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handlePayRemainder = async (e) => {
        e.preventDefault();

        try {
            // Place the logic to handle payment of the remainder amount here
            // You can send the payment request to your backend and update the order status accordingly

            // For demo purposes, assume payment is successful and navigate to confirmation page
            navigate('/payment-confirmation'); // Redirect to payment confirmation page
        } catch (error) {
            console.error('Error processing payment:', error.message);
            // Handle payment error
        }
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // Fetch total amount from the backend or local storage
                const storedTotalAmount = 200; // Example: Replace with actual total amount from backend or previous page
                setTotalAmount(storedTotalAmount);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error.message);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="payment-remainder-page">
            <h1>Payment Remainder</h1>
            <div className="payment-details">
                <p>You have paid 40% of the total amount as initial payment.</p>
                <p>Remaining Amount to Pay: Ksh {totalAmount * 0.6}</p>
            </div>
            <form onSubmit={handlePayRemainder}>
                <button type="submit" className="pay-button">Pay Remaining Amount</button>
            </form>
        </div>
    );
};

export default PaymentRemainderPage;
