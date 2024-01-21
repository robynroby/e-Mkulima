import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import './AC.scss';



const AdminPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        img: '',
        price: 0,
    });

    const [errors, setErrors] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    //   decode token from local storage to check if admin is true
    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        if (decodedToken.isAdmin) {
            setIsAdmin(true);
        }
    }
        , []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // the price should be a number
            formData.price = Number(formData.price);
            console.log(formData);
            const token = localStorage.getItem('token');
            console.log(token)
            console.log(JSON.stringify(formData))

            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'token': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
            }

            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
            setErrors(error.message);
        }
    };




    if (!isAdmin) {
        return <div>You do not have permission to access this page.</div>;
    }

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Add Product (Admin Page)</h2>
                <p className="error-message">{errors}</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" value={formData.title} name="title" required placeholder='Title' onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" value={formData.desc} name="desc" required placeholder='Description' onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="number" value={formData.price} name="price" required placeholder='Price' onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="file" id="image" name="img" required placeholder='Image' onChange={handleInputChange} multiple={false} />
                    </div>
                    {/* button */}
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting}>Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;
