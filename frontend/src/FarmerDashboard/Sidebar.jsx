import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div className="sidebar">
            <h2>Farmer Dashboard</h2>
            <ul>
                <li>
                    <Link to="/products">Manage Products</Link>
                </li>
                <li>
                    <Link to="/orders">Manage Orders</Link>
                </li>
                <li>
                    <Link to="/account">Account Settings</Link>
                </li>
                <li>
                    <Link onClick={handleLogout}>logout</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
