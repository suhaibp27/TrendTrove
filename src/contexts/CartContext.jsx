import { createContext, useReducer, useContext, useEffect } from "react";

// Define action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const CLEAR_CART = "CLEAR_CART";
const SET_TOTAL = "SET_TOTAL";

// Define initial state
const initialState = {
  cartItems: [],
  cartTotal: 0,
};

// Define reducer function
const reducer = (cartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = cartState.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedCartItems;
      if (existingItemIndex !== -1) {
        updatedCartItems = [...cartState.cartItems];
        updatedCartItems[existingItemIndex].quantity = action.payload.quantity;
      } else {
        updatedCartItems = [action.payload, ...cartState.cartItems];
      }
      const updatedTotal = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return {
        ...cartState,
        cartItems: updatedCartItems,
        cartTotal: parseFloat(updatedTotal.toFixed(2)),
      };
    case REMOVE_FROM_CART:
      const updatedCartItemsForDelete = cartState.cartItems.filter(
        (item) => item.id !== action.payload
      );
      const updatedTotalForDelete = updatedCartItemsForDelete.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return {
        ...cartState,
        cartItems: updatedCartItemsForDelete,
        cartTotal: parseFloat(updatedTotalForDelete.toFixed(2)),
      };
    case UPDATE_QUANTITY:
      const updatedCartItemsForUpdate = cartState.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      const updatedTotalForUpdate = updatedCartItemsForUpdate.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return {
        ...cartState,
        cartItems: updatedCartItemsForUpdate,
        cartTotal: parseFloat(updatedTotalForUpdate.toFixed(2)),
      };
    case CLEAR_CART:
      return {
        ...cartState,
        cartItems: [],
        cartTotal: 0,
      };
    default:
      return cartState;
  }
};

// Create context
const CartContext = createContext();

// Create provider component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };

  const updateQuantity = (item) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume context
export const useCart = () => useContext(CartContext);
