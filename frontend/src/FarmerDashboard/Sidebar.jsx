import { Link, useNavigate } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div className="sidebar">
            <h2>Farmer Dashboard</h2>

            {/* a line across the sidebar */}
            <hr />
            <ul>
                <li>
                    <Link to="/fdashboard">Manage Products</Link>
                </li>
                <li>
                    <Link to="/manage-orders">Manage Orders</Link>
                </li>
                <li>
                    <Link to="/add-product">Add Product</Link>
                </li>
                <li>
                    <Link to="#">Account Settings</Link>
                </li>
                <li>
                    <Link onClick={handleLogout}>logout</Link>
                </li>
                <li>
                    <Link to="/">Back to Application</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
