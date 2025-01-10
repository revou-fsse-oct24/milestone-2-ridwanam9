import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            ShopSmart
          </Link>
          
          <nav className="nav">
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/cart" className="nav-link">
              Cart ({cartItems.length})
            </Link>
            {user ? (
              <>
                <span className="nav-link">{user.name}</span>
                <button onClick={logout} className="button button-secondary">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="button button-primary">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

