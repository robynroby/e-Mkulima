import AdminPage from '../components/AccessControl/AdminPage';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import Sidebar from './Sidebar';
import './dashboard.scss';

const Dashboard = () => {


    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <ProductList />
                <AdminPage />
                <ProductDetail />
            </div>
        </div>
    )
}

export default Dashboard
