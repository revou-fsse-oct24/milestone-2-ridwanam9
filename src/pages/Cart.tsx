import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-center mt-4">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <h3>{item.title}</h3>
                <p className="product-price">${item.price}</p>
              </div>
              <div>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="button"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="button"
                >
                  +
                </button>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="cart-total">
            Total: ${total.toFixed(2)}
          </div>
          
          <div className="text-center mt-4">
            <button 
              onClick={clearCart}
              className="button button-primary"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

