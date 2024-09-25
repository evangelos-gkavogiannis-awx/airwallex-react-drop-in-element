import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import CartProvider from './CartContext';
import { CheckoutProvider } from './components/CheckoutContext';
import Checkout from './components/Checkout';

function App() {
  return (
    <CartProvider>
      <CheckoutProvider>
      <BrowserRouter> {/* Make sure BrowserRouter wraps the whole app */}
        <Container>
          <NavbarComponent />
          <Routes>
            <Route index element={<Store />} />
            <Route path="checkout" element={<Checkout />} /> {/* Add the Checkout route */}
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Routes>
        </Container>
      </BrowserRouter>
      </CheckoutProvider>
    </CartProvider>
  );
}

export default App;
