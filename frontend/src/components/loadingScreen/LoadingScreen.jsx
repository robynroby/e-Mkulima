import { useNavigate } from 'react-router-dom';
import './loadingScreen.css';

const LoadingScreen = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/checkout")
    }

    return (
        <div className="load-container">
            <h4>Your Request is being processed.You will receive a request to enter MPESA PIN shortly.</h4>
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