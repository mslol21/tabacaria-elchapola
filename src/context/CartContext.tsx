import React, { createContext, useContext, useState, useMemo } from 'react';
import type { CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Logic to check if item already exists with SAME variations/customizations
      const existingItemIndex = prevCart.findIndex(
        (i) => 
          i.id === item.id && 
          JSON.stringify(i.selectedVariations) === JSON.stringify(item.selectedVariations) &&
          i.customName === item.customName &&
          JSON.stringify(i.selectedCustomizations) === JSON.stringify(item.selectedCustomizations)
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      let itemPrice = item.price;

      // Check for wholesale pricing
      if (item.wholesale_price && item.wholesale_min_quantity && item.quantity >= item.wholesale_min_quantity) {
        itemPrice = item.wholesale_price;
      }

      // Add variations price (if any variation adds price)
      // Note: In the current type, variations don't have separate prices per option yet, 
      // but we can extend this logic if needed.

      // Add custom name price
      if (item.customName && item.name_price) {
        itemPrice += item.name_price;
      }

      // Add customizations price
      if (item.selectedCustomizations) {
        const customizationsTotal = item.selectedCustomizations.reduce((acc, curr) => acc + curr.price, 0);
        itemPrice += customizationsTotal;
      }

      return total + itemPrice * item.quantity;
    }, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
