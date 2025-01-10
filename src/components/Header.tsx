import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ShopSmart</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
            {user ? (
              <>
                <li>Welcome, {user.name}</li>
                <li><button onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

