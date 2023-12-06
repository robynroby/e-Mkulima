import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import AllProducts from './components/AllProducts'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import SingleProductPage from './components/SingleProductPage';
import HomePage from './components/HomePage';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path='/single-product' element={<SingleProductPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App