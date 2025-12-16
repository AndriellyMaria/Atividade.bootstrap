import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: "",
    email: user?.email || "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    pagamento: "cartao"
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    if (!formData.cep.trim()) newErrors.cep = "CEP é obrigatório";
    if (!formData.endereco.trim()) newErrors.endereco = "Endereço é obrigatório";
    if (!formData.numero.trim()) newErrors.numero = "Número é obrigatório";
    if (!formData.cidade.trim()) newErrors.cidade = "Cidade é obrigatória";
    if (!formData.estado.trim()) newErrors.estado = "Estado é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Por favor, corrija os erros no formulário");
      return;
    }

    if (!user) {
      alert("Você precisa estar logado para finalizar a compra");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    try {
      // Simular processamento do pedido
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        user: user.uid,
        items: cart,
        total: getTotal() + 15, // + frete
        shipping: formData,
        paymentMethod: formData.pagamento,
        createdAt: new Date().toISOString(),
        status: "pending"
      };

      // Aqui você salvaria no Firebase
      console.log("Pedido criado:", orderData);
      
      // Limpar carrinho
      clearCart();
      
      // Redirecionar para confirmação
      navigate("/order-confirmation", { 
        state: { 
          orderNumber: `ORD${Date.now()}`, 
          total: getTotal() + 15 
        } 
      });
      
    } catch (error) {
      alert("Erro ao processar pedido: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Finalizar Pedido</h1>
      
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Informações de Entrega</h2>
          
          <div className="form-group">
            <label>Nome Completo *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              className={errors.nome ? "error" : ""}
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
              <small>Email da sua conta</small>
            </div>
            
            <div className="form-group">
              <label>Telefone *</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                className={errors.telefone ? "error" : ""}
              />
              {errors.telefone && <span className="error-message">{errors.telefone}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label>CEP *</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="00000-000"
              className={errors.cep ? "error" : ""}
            />
            {errors.cep && <span className="error-message">{errors.cep}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Endereço *</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Rua, Avenida, etc"
                className={errors.endereco ? "error" : ""}
              />
              {errors.endereco && <span className="error-message">{errors.endereco}</span>}
            </div>
            
            <div className="form-group">
              <label>Número *</label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="123"
                className={errors.numero ? "error" : ""}
              />
              {errors.numero && <span className="error-message">{errors.numero}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label>Complemento</label>
            <input
              type="text"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              placeholder="Apartamento, bloco, etc"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Cidade *</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Sua cidade"
                className={errors.cidade ? "error" : ""}
              />
              {errors.cidade && <span className="error-message">{errors.cidade}</span>}
            </div>
            
            <div className="form-group">
              <label>Estado *</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className={errors.estado ? "error" : ""}
              >
                <option value="">Selecione</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                {/* Adicione mais estados */}
              </select>
              {errors.estado && <span className="error-message">{errors.estado}</span>}
            </div>
          </div>
          
          <h2>Método de Pagamento</h2>
          
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="pagamento"
                value="cartao"
                checked={formData.pagamento === "cartao"}
                onChange={handleChange}
              />
              <i className="bi bi-credit-card"></i>
              Cartão de Crédito
            </label>
            
            <label className="payment-option">
              <input
                type="radio"
                name="pagamento"
                value="boleto"
                checked={formData.pagamento === "boleto"}
                onChange={handleChange}
              />
              <i className="bi bi-upc"></i>
              Boleto Bancário
            </label>
            
            <label className="payment-option">
              <input
                type="radio"
                name="pagamento"
                value="pix"
                checked={formData.pagamento === "pix"}
                onChange={handleChange}
              />
              <i className="bi bi-qr-code"></i>
              PIX
            </label>
          </div>
          
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isProcessing || cart.length === 0}
          >
            {isProcessing ? (
              <>
                <span className="spinner"></span> Processando...
              </>
            ) : (
              `Finalizar Compra - R$ ${(getTotal() + 15).toFixed(2)}`
            )}
          </button>
        </form>
        
        <div className="order-summary">
          <h2>Resumo do Pedido</h2>
          
          <div className="order-items">
  {cart.map(item => {
    const quantity = item.quantity ?? 1;

    const image =
      item.images && item.images.length > 0
        ? item.images[0]
        : "https://via.placeholder.com/80";

    return (
      <div key={item.id} className="order-item">
        <img src={image} alt={item.name} />

        <div>
          <h4>{item.name}</h4>
          <p>
            {quantity} × R$ {item.price.toFixed(2)}
          </p>
        </div>

        <span>
          R$ {(item.price * quantity).toFixed(2)}
        </span>
      </div>
    );
  })}
</div>

          
          <div className="order-items">
  {cart.map(item => {
    const price = Number(item.price ?? 0);
    const quantity = Number(item.quantity ?? 1);

    const image =
      item.images && item.images.length > 0
        ? item.images[0]
        : "https://via.placeholder.com/80";

    return (
      <div key={item.id} className="order-item">
        <img src={image} alt={item.name} />

        <div>
          <h4>{item.name}</h4>
          <p>
            {quantity} × R$ {price.toFixed(2)}
          </p>
        </div>

        <span>
          R$ {(price * quantity).toFixed(2)}
        </span>
      </div>
    );
  })}
</div>

          
          <div className="security-info">
            <p><i className="bi bi-lock-fill"></i> Compra protegida</p>
            <p><i className="bi bi-shield-check"></i> Dados criptografados</p>
          </div>
        </div>
      </div>
    </div>
  );
}