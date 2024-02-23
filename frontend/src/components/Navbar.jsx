// import React, { useContext } from 'react'
import React from 'react';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <nav className="navbar">
            <div className="logo">Green<span>X</span></div>
            <ul className="navLinks">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={'/products/page/1'}>Products</Link></li>
                <li><Link to={"/account"}>Account</Link></li>
            </ul>
            <div className="rightLinks">
                <Link to={'/cart'}>
                    <img src="/cart.svg" alt="" />
                    {/* <span>3</span> */}
                </Link>
                <Link onClick={handleLogout}>Logout</Link>
            </div>
        </nav>
    );
};

export default Navbar;
