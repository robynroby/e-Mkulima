import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Admin.scss';

const AdminPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        img: [],
        price: '',
        category: '',
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
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        // Handle file input separately
        if (type === 'file') {
            setFormData({ ...formData, [name]: files }); // Accept multiple files
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

            for (let i = 0; i < formData.img.length; i++) {
                formDataForServer.append('img', formData.img[i]);
            }

            formDataForServer.append('category', formData.category);

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
                throw new Error(
                    `HTTP error! Status: ${response.status} ${response.statusText
                    }. Server error message: ${errorMessage}`
                );
            }

            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
            console.log(error.message);
            setErrors('Error adding product');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAdmin) {
        return <div
            style={
                {
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
                    marginTop: '5rem',
                }
            }>You do not have permission to access this page.</div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-container">
                <h2>Add Product (Admin Page)</h2>
                <p className="error-message">{errors}</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={formData.title}
                            name="title"
                            required
                            placeholder="Title"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={formData.desc}
                            name="desc"
                            required
                            placeholder="Description"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            value={formData.price}
                            name="price"
                            required
                            placeholder="Price"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="file"
                            id="image"
                            name="img"
                            required
                            placeholder="Image"
                            onChange={handleInputChange}
                            multiple={true} // Accept multiple files
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="vegetables">Vegetables</option>
                            <option value="fruits">Fruits</option>
                            <option value="grains">Grains</option>
                            <option value="dairy">Dairy</option>
                            <option value="meat">Meat</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    {/* button */}
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting}>
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;