import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="cart-empty">
        <h2>🛒 Carrinho Vazio</h2>
        <p>Faça login para ver seu carrinho</p>
        <button onClick={() => navigate("/login")} className="btn-login">
          Fazer Login
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>🛒 Carrinho Vazio</h2>
        <p>Adicione produtos para ver aqui</p>
        <Link to="/store" className="btn-shop">
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Meu Carrinho</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.images[0]} alt={item.name} />
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="price">R$ {item.price.toFixed(2)}</p>
                
                <div className="quantity-control">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                
                <p className="subtotal">
                  Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                className="btn-remove"
                title="Remover"
              >
                ×
              </button>
            </div>
          ))}
          
          <div className="cart-actions">
            <button onClick={clearCart} className="btn-clear">
              Limpar Carrinho
            </button>
            <Link to="/store" className="btn-continue">
              Continuar Comprando
            </Link>
          </div>
        </div>
        
        <div className="cart-summary">
          <h2>Resumo do Pedido</h2>
          
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>R$ {getTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Frete</span>
              <span>R$ 15,00</span>
            </div>
            <div className="summary-row total">
              <strong>Total</strong>
              <strong>R$ {(getTotal() + 15).toFixed(2)}</strong>
            </div>
          </div>
          
          <button 
            onClick={() => navigate("/checkout")}
            className="btn-checkout"
          >
            Finalizar Compra
          </button>
          
          <div className="payment-methods">
            <p><i className="bi bi-shield-check"></i> Compra 100% segura</p>
            <p><i className="bi bi-credit-card"></i> Aceitamos todos os cartões</p>
          </div>
        </div>
      </div>
    </div>
  );
}