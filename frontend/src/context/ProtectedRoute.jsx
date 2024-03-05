import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken || userToken === 'undefined') {
            setAuthenticated(false);
            return navigate('/login');
        }
        setAuthenticated(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [authenticated]);
    return (
        <React.Fragment>
            {
                authenticated ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;