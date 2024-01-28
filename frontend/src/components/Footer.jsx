import React from 'react';
import './Footer.scss';
import { FaFacebook,FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Sign up for our newsletter</h3>
                        <p>Be the first to know about our special offers, news, and updates.</p>
                        <form action="#">
                            <input type="email" placeholder="Email Address" />
                            <button>Subscribe</button>
                        </form>
                    </div>
                    {/* <div className="footer-section">
                        <h3>Customer Service</h3>
                        <ul>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">FAQs</a></li>
                        </ul>
                    </div> */}
                    <div className="footer-section">
                        <h3>Shop</h3>
                        <ul>
                            <li><Link to={'/products'}>Products</Link></li>
                            <li><Link href="#">Sales</Link></li>
                            <li><Link href="#">New Arrivals</Link></li>
                        </ul>
                    </div>
                    <div className="socials">
                        <span>Follow Us</span>
                        <ul>
                            <li><a href="#"><FaFacebook /></a></li>
                            <li><a href="#"><FaTwitter /></a></li>
                            <li><a href="#"><FaInstagram /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
