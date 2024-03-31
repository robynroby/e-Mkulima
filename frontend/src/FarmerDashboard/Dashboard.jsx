// import AddProductPage from '../components/AccessControl/AddProductPage';
// import ProductDetail from './ProductDetail';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import Sidebar from './Sidebar';
import './dashboard.scss';


const Dashboard = () => {
    const [isFarmer, setIsFarmer] = useState(false);


    //   decode token from local storage to check if admin is true
    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        if (decodedToken.role === "farmer") {
            setIsFarmer(true);
        }
    }, []);

    if (!isFarmer) {
        return <div
            style={
                {
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
                    marginTop: '5rem',
                }
            }>You do not have permission to access this page.</div>;
    }

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                {/* <AddProductPage /> */}
                <ProductList />
            </div>
        </div>
    )
}

export default Dashboard
