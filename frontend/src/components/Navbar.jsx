// import React, { useContext } from 'react'
import React from 'react';
import './Navbar.scss';
import { FaShoppingCart } from 'react-icons/fa';

import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">Green<span>X</span></div>
            <ul className="navLinks">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={'/products'}>Products</Link></li>
                <li><a href="/#account">Account</a></li>
            </ul>
            <div className="rightLinks">
                <Link to={'/cart'}>
                    <img src="/cart.svg" alt="" />
                    <span>3</span>
                </Link>
                <a href="/#login">Login</a>
                <a href="/#signup">Sign Up</a>
            </div>
        </nav>
    );
};



export default Navbar;
