import React, { useState } from 'react'
import Sidebar from './Sidebar'
import AdminPage from '../components/AccessControl/AdminPage';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import './dashboard.scss'; 

const Dashboard = () => {
    

    return (
        <div className="dashboard"> 
            <Sidebar />
            <div className="content"> 
                <ProductList />
                <AdminPage /> 
                <ProductDetail />
            </div>
        </div>
    )
}

export default Dashboard
