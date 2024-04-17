import { useState } from 'react';
import './AddProducts.scss';
import Sidebar from '../../FarmerDashboard/Sidebar';

const AddProductPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        img: [],
        price: '',
        category: '',
    });

    const [errors, setErrors] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    //capture the location of whoever is posting the product
    // const [location, setLocation] = useState(null)

    // function success(position) {
    //     const latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     setLocation({ latitude, longitude });
    //     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    // }

    function error() {
        console.log("Unable to retrieve your location");
    }


  
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

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
            setIsSubmitting(false); // Set submitting state to false
        }
    };

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // setLocation({ latitude, longitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        // After getting the location, proceed with form submission
        submitFormData(latitude, longitude);
    };

    const submitFormData = async (latitude, longitude) => { // Pass latitude and longitude as arguments
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            const formDataForServer = new FormData();
            formDataForServer.append('title', formData.title);
            formDataForServer.append('desc', formData.desc);
            formDataForServer.append('price', formData.price);

            for (let i = 0; i < formData.img.length; i++) {
                formDataForServer.append('img', formData.img[i]);
            }

            formDataForServer.append('category', formData.category);
            formDataForServer.append('farmerName', username);

            // Check if latitude and longitude are valid before constructing location object
            if (latitude !== null && longitude !== null) {
                // Construct the location object
                const locationObj = {
                    type: "Point",
                    coordinates: [parseFloat(longitude), parseFloat(latitude)]
                };

                formDataForServer.append('location', JSON.stringify(locationObj));
            } else {
                throw new Error("Invalid geolocation data");
            }

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
            // if successful, clear the form
            setFormData({
                title: '',
                desc: '',
                img: [],
                price: '',
                category: '',
            });
            setErrors('');
        } catch (error) {
            console.error('Error adding product:', error.message);
            console.log(error.message);
            setErrors( error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="admin-page">
            <Sidebar />
            <div className="admin-container">
                <h2>Add Products </h2>
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
                        {/* <button onClick={handleLocationClick}>get location</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;