import { FaTimes } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useData } from "../../contexts/DataContext";
import "./Cart.css";
import { useEffect } from "react";

const Cart = () => {
  const { setProductModal } = useData();
  const { cartState, updateQuantity, removeFromCart, clearCart } = useCart();

  const decreaseQuantity = (cartItem) => {
    if (cartItem.quantity > 1) {
      updateQuantity({ ...cartItem, quantity: cartItem.quantity - 1 });
    }
  };

  const increaseQuantity = (cartItem) => {
    updateQuantity({ ...cartItem, quantity: cartItem.quantity + 1 });
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const truncateText = (elementSelector, maxLength) => {
    const elements = document.querySelectorAll(elementSelector);

    elements.forEach((element) => {
      let text = element.textContent.trim();
      if (text.length > maxLength) {
        text = text.slice(0, maxLength) + "...";
      }
      element.textContent = text;
    });
  };

  useEffect(() => {
    truncateText(".cart-item-title", 60);
  }, [cartState.cartItems]);

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <div className="cart-top">
          <h4>Cart</h4>
          <div className="cart-total">
            <p>Total</p>
            <h4>$ {cartState.cartTotal}</h4>
          </div>
        </div>
        <div className="cart-bottom">
          {cartState.cartItems.length > 0 ? (
            cartState.cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-product">
                  <div className="cart-product-top">
                    <div
                      className="cart-image-div"
                      onClick={() => setProductModal("show", item)}
                    >
                      {item.image && <img src={item.image} alt={item.title} />}
                    </div>
                    <h4 className="cart-item-title">{item.title}</h4>
                  </div>
                  <div className="cart-product-bottom">
                    <div className="cart-product-quantity">
                      {/* <span>-</span> */}
                      <span onClick={() => decreaseQuantity(item)}>-</span>
                      <p>{item.quantity}</p>
                      {/* <span>+</span> */}
                      <span onClick={() => increaseQuantity(item)}>+</span>
                    </div>
                    <p className="cart-item-price">
                      $ {parseFloat((item.quantity * item.price).toFixed(2))}
                    </p>
                    <FaTimes
                      className="cart-item-remove"
                      onClick={() => handleRemove(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3>No items in cart.</h3>
          )}
        </div>
        {cartState.cartItems.length > 0 && (
          <div className="cart-footer">
            <p onClick={clearCart}>Clear cart</p>
            <button>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
