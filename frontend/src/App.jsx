import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate, Outlet } from 'react-router-dom';
import './App.css'
import AllProducts from './components/AllProducts'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import SingleProductPage from './components/SingleProductPage';
import HomePage from './components/HomePage';
import CheckoutPage from './components/Checkout';
import SignUp from './components/AccessControl/Signup';
import Login from './components/AccessControl/Login';
import ProtectedRoute from './context/ProtectedRoute';
import { UserContext } from './context/DataContext';
import Account from './components/Account';
import AdminPage from './components/AccessControl/AdminPage';
import Dashboard from './FarmerDashboard/Dashboard';


const App = () => {
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const [isAuth, setisAuth] = useState(getToken());

  const Layout = () => {
    return (
      <div className="App">
        <Navbar />
        <div className="main-container">
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        </div>
        <Footer />
      </div>
    )
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/products/page/:page",
          element: <AllProducts />
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/products/:id",
          element: <SingleProductPage />
        },
        {
          path: "/checkout",
          element: <CheckoutPage />
        },
        {
          path: "/account",
          element: <Account />
        },
        {
          path:"/admin",
          element: <AdminPage />
        }
      ]

    },

    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <SignUp />
    },
    {
      path: "/fdashboard",
      element: <Dashboard />
    }

    // TODO: Add a 404 page
    // {
    //   path: "*",
    //   element: <NotFound />
    // }

  ]);

  return (

    <UserContext.Provider value={{ isAuth, setisAuth }}>


      <RouterProvider router={router} />

    </UserContext.Provider>

  )
}

export default App
