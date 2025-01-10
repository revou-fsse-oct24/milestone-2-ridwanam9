import { useMemo, useCallback } from 'react';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../types';

const CartItemComponent: React.FC<{
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}> = ({ item, onUpdateQuantity, onRemove }) => {
  const subtotal = useMemo(() => 
    item.price * item.quantity
  , [item.price, item.quantity]);

  return (
    <div className="cart-item">
      <div>
        <h3 className="product-title">{item.title}</h3>
        <p className="product-price">${item.price.toFixed(2)} each</p>
        <p className="text-sm text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="button"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="button"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="button button-secondary ml-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  , [cartItems]);

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity);
    }
  }, [updateQuantity]);

  const handleRemoveItem = useCallback((id: number) => {
    removeFromCart(id);
  }, [removeFromCart]);

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-4">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center mt-4">
          <p className="text-gray-600">Your cart is empty</p>
          <a href="/products" className="button button-primary mt-4">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div>
          {cartItems.map(item => (
            <CartItemComponent
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
          
          <div className="cart-total mt-4">
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

