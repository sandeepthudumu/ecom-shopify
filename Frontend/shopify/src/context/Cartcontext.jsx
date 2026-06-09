import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  items: [],
  cart_total: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "CLEAR_CART":
      return {
        items: [],
        cart_total: 0,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};