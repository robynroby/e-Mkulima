import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import './AdminPage.scss';


const AdminPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        price: '',
        img: null,
    });

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
        const { title, value, files } = e.target;

        setFormData({
            ...formData,
            [title]: files ? files[0] : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { title, desc, price, img } = formData;

            const data = new FormData();
            data.append('title', title);
            data.append('desc', desc);
            data.append('price', price);
            data.append('image', img);

            // Get the token from local storage
            const token = localStorage.getItem('token');

            await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: data,
            });

            // Add any success handling here

        } catch (error) {
            console.error('Error adding product:', error);
            // Add error handling here
        }
    };

    if (!isAdmin) {
        return <div>You do not have permission to access this page.</div>;
    }

    return (
        <div>
            <h2>Add Product (Admin Page)</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="name" value={formData.title} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.desc} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleInputChange} />
                </div>
                <div>
                    <button type="submit">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AdminPage;
