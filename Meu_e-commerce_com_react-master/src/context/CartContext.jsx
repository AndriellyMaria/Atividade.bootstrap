import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Carregar carrinho do localStorage quando o usuário mudar
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.uid}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } else {
      setCart([]);
    }
  }, [user]);

  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    if (user && cart.length > 0) {
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
    }
  }, [cart, user]);

function addToCart(product) {
  if (!user) {
    alert("Por favor, faça login para adicionar produtos ao carrinho!");
    return false;
  }

  setCart(prev => {
    const existingItem = prev.find(item => item.id === product.id);

    if (existingItem) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [
      ...prev,
      {
        id: product.id,
        name: product.nome || product.name,
        price: Number(product.preco ?? product.price ?? 0), // ✅ GARANTIDO
        images: product.images || product.imagens || [],
        quantity: 1
      }
    ];
  });

  return true;
}


  function removeFromCart(productId) {
    setCart(prev => prev.filter(item => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
    if (user) {
      localStorage.removeItem(`cart_${user.uid}`);
    }
  }

  function getTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getTotalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export const useCart = () => useContext(CartContext);