import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AC.scss';

const Login = () => {
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful login, e.g., redirect to a new page
                console.log('Login successful', data);
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/')
            } else {
                // Handle login error
                console.error('Login failed', data);
                setError(data);
            }
        } catch (error) {
            console.error('Login error', error);
            setError(error);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Login</h2>
                <p className="error-message">{error}</p>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            placeholder='Username'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder='Password'
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button type="submit">Login</button>
                    <div className="redirect-text">
                        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
