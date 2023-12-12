import React from 'react';
import './AC.scss';

const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" id="firstName" name="firstName" required placeholder='Firstname' />
                    </div>
                    <div className="form-group">
                        <input type="text" id="lastName" name="lastName" required placeholder='Lastname' />
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" name="email" required placeholder='Email' />
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" required placeholder='Password' />
                    </div>
                    <button type="submit">Sign Up</button>
                    <div className="redirect-text">
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
