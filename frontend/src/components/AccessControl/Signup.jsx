import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AC.scss';

const SignUp = () => {
    const [errors, setErrors] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'farmer',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Successful registration logic
                console.log('Registration successful');
                navigate('/login')
                setIsSubmitting(false);
            } else {
                // Handle error
                console.error('Registration failed');
                setErrors("Registration failed");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Create an Account</h2>
                <p className="error-message">{errors}</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" id="userName" name="username" required placeholder='Username' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" name="email" required placeholder='Email' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" required placeholder='Password' onChange={handleChange} />
                    </div>
                    {/* button */}
                    <div className="form-group">
                        <button type="submit" className="btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </div>
                    <div className="redirect-text">
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
