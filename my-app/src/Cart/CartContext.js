import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCart] = useState([]); // ✅ Keep it as an array
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart((prevItems) => [...prevItems, item]); // ✅ Add new item to array
    navigate('/cart')
  };

  return (
    <CartContext.Provider value={{ addToCart, setCart, cartItem }}>
      {children}
    </CartContext.Provider>
  );
};
