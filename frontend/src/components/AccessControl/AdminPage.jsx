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
        const { name, value, type, files } = e.target;

        // Handle file input separately
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] }); // Assuming you only want to upload one file
        } else {
            // Convert price to number
            const newValue = name === 'price' ? parseFloat(value) : value;
            setFormData({ ...formData, [name]: newValue });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');

            console.log(formData);

            const formDataForServer = new FormData();
            formDataForServer.append('title', formData.title);
            formDataForServer.append('desc', formData.desc);
            formDataForServer.append('price', formData.price);
            formDataForServer.append('img', formData.img);

            console.log(formDataForServer);

            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'token': `Bearer ${token}`,
                },
                body: formDataForServer,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}. Server error message: ${errorMessage}`);
            }

            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
            console.log(error.message);
            setErrors("Error adding product")
        } finally {
            setIsSubmitting(false);
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