import { useEffect, useState } from 'react';
import Sidebar from '../FarmerDashboard/Sidebar';
import './ManageOrders.scss';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFarmerOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                const ordersResponse = await fetch(`http://localhost:5000/api/orders/farmer/${userId}`, {
                    headers: {
                        'token': `Bearer ${token}`,
                    },
                });

                if (!ordersResponse.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const ordersData = await ordersResponse.json();

                // Fetch user details concurrently for each order
                const userPromises = ordersData.map(async order => {
                    const userResponse = await fetch(`http://localhost:5000/api/users/find/${order.userId}`, {
                        headers: {
                            'token': `Bearer ${token}`,
                        },
                    });
                    if (!userResponse.ok) {
                        throw new Error('Failed to fetch user details');
                    }
                    const userData = await userResponse.json();
                    return { ...order, username: userData.username }; // Combine order and user data
                });

                const updatedOrders = await Promise.all(userPromises);

                console.log('Fetched farmer orders:', updatedOrders);
                setOrders(updatedOrders);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching farmer orders:', error);
                setLoading(false);
            }
        };


        fetchFarmerOrders();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="manage-orders-page">
                <h1>Manage Orders</h1>
                {loading ? (
                    <p>Loading orders...</p>
                ) : (
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>User</th>
                                <th>Products</th>
                                <th>Address</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>
                                        {orders.indexOf(order) + 1}
                                    </td>
                                    <td>{order.username}</td>  
                                    <td>
                                        <ul>
                                            {order.products.map(product => (
                                                <li key={product.productId}>
                                                    {product.quantity} x {product.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{order.address}</td>
                                    <td>Ksh {order.amount}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button className="action-button" onClick={() => handleUpdateStatus(order._id)}>Update Status</button>
                                        <button className="action-button" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default ManageOrders;
