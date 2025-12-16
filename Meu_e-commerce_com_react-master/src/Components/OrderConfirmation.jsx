import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { orderNumber, total } = location.state || {
    orderNumber: `ORD${Date.now().toString().slice(-6)}`,
    total: 0
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <div className="success-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <h1>Compra Realizada com Sucesso!</h1>
          <p>Seu pedido foi confirmado e está sendo processado</p>
        </div>
        
        <div className="confirmation-details">
          <div className="detail-item">
            <span>Número do Pedido</span>
            <strong>{orderNumber}</strong>
          </div>
          
          <div className="detail-item">
            <span>Valor Total</span>
            <strong>R$ {total.toFixed(2)}</strong>
          </div>
          
          <div className="detail-item">
            <span>Email de Confirmação</span>
            <strong>{user?.email || "Seu email"}</strong>
          </div>
          
          <div className="detail-item">
            <span>Previsão de Entrega</span>
            <strong>7 a 10 dias úteis</strong>
          </div>
        </div>
        
        <div className="confirmation-actions">
          <button onClick={() => navigate("/perfil")} className="btn-orders">
            <i className="bi bi-bag"></i>
            Ver Meus Pedidos
          </button>
          
          <button onClick={() => navigate("/store")} className="btn-continue">
            <i className="bi bi-cart"></i>
            Continuar Comprando
          </button>
          
          <button onClick={() => window.print()} className="btn-print">
            <i className="bi bi-printer"></i>
            Imprimir Recibo
          </button>
        </div>
        
        <div className="confirmation-info">
          <p><i className="bi bi-envelope"></i> Enviaremos atualizações por email</p>
          <p><i className="bi bi-headset"></i> Dúvidas? Entre em contato com nosso suporte</p>
        </div>
      </div>
    </div>
  );
}