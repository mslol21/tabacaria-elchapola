import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { DataProvider } from './context/DataContext';
import { CartProvider } from './context/CartContext';

// Pages (to be created)
import Landing from './pages/Landing';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <StoreProvider>
        <DataProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/login" element={<AdminLogin />} />
            </Routes>
          </CartProvider>
        </DataProvider>
      </StoreProvider>
    </Router>
  );
}

export default App;
