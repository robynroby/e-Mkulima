import React from 'react';
import './AC.scss';

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input type="email" id="email" name="email" required placeholder='Email' />
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" required placeholder='Password' />
                    </div>
                    <button type="submit">Login</button>
                    <div className="redirect-text">
                        <p>Already have an account? <a href="/signup">Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
