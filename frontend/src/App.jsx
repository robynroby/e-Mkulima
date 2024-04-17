import { useState } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './FarmerDashboard/Dashboard';
import ManageOrders from './FarmerDashboard/ManageOrders';
import AdminPage from './components/AccessControl/AddProductPage';
import BuyerSignUp from './components/AccessControl/BuyerSignup';
import SignUp from './components/AccessControl/FarmerSignup';
import Login from './components/AccessControl/Login';
import Account from './components/Account';
import AllProducts from './components/AllProducts';
import Cart from './components/Cart';
import CheckoutPage from './components/Checkout';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import SingleProductPage from './components/SingleProductPage';
import LoadingScreen from './components/loadingScreen/LoadingScreen';
import { UserContext } from './context/DataContext';
import ProtectedRoute from './context/ProtectedRoute';
import PaymentRemainderPage from './components/PaymentRemainderPage';


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
          path: "/admin",
          element: <AdminPage />
        },
        {
          path: "/loading",
          element: <LoadingScreen />
        },
        {
          path: "/payment-confirmation",
          element: <PaymentRemainderPage />
        }
      ]

    },

    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/farmer/register",
      element: <SignUp />
    },
    {
      path: "/buyer/register",
      element: <BuyerSignUp />
    },
    {
      path: "/fdashboard",
      element: <Dashboard />
    },
    {
      path: "/manage-orders",
      element: <ManageOrders />
    },
    {
      path: "/add-product",
      element: <AdminPage />
    },
    {
      path: "/success",
      element: <h1>successfully placed an order</h1>
    },


    // TODO: Add a 404 page
    {
      path: "/error",
      element: <h1>error placing order</h1>
    }

  ]);

  return (

    <UserContext.Provider value={{ isAuth, setisAuth }}>


      <RouterProvider router={router} />

    </UserContext.Provider>

  )
}

export default App


// placeholder image
// https://placehold.co/600x400/png