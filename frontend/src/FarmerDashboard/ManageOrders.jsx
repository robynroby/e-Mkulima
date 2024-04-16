import { useEffect, useState } from 'react';
import './ManageOrders.scss';
import Sidebar from '../FarmerDashboard/Sidebar'

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFarmerOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                const response = await fetch(`http://localhost:5000/api/orders/farmer/${userId}`, {
                    headers: {
                        'token': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                console.log('Fetched farmer orders:', data);
                setOrders(data);
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
                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>Products</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.userId}</td>
                                <td>
                                    <ul>
                                        {order.products.map(product => (
                                            <li key={product.productId}>
                                                {product.quantity} x {product.title}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
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
