import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AC.scss';

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

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
                // add user id to local storage
                localStorage.setItem('userId', data._id);
                localStorage.setItem('username', data.username);
                localStorage.setItem('token', data.accessToken);
                setLoading(false)
                
                if (data.role === 'farmer') {
                    navigate('/fdashboard');
                } else {
                    navigate('/');
                }
            } else {
                // Handle login error
                console.error('Login failed', data);
                setError(data);
                setLoading(false)
            }
        } catch (error) {
            console.error('Login error', error);
            setError(error);
            setLoading(false)
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
                    <div className="form-group">
                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? 'logging in...' : 'Login'}
                        </button>
                    </div>
                    <div className="redirect-text">
                        <p>Don&apos;t have an account? <a href="/buyer/register">Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
