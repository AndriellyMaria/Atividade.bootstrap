import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import "./Store.css";

export default function Store() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const produtosRef = collection(db, "produtos");
        const q = query(produtosRef, orderBy("nome"));
        const querySnapshot = await getDocs(q);
        
        const produtosData = [];
        querySnapshot.forEach((doc) => {
          produtosData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setProducts(produtosData);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setError("Erro ao carregar produtos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Comprar Agora ➜ Checkout
  const handleBuyNow = (product) => {
    if (!user) {
      alert("Por favor, faça login para comprar!");
      navigate("/login");
      return;
    }
    
    if (addToCart(product)) {
      navigate("/checkout");
    }
  };

  // Adicionar ao carrinho
  const handleAddToCart = (product, event) => {
    if (!user) {
      alert("Por favor, faça login para adicionar produtos ao carrinho!");
      navigate("/login");
      return;
    }
    
    if (addToCart(product)) {
      // Feedback visual
      const button = event.target;
      const originalText = button.textContent;
      button.textContent = "✓ Adicionado!";
      button.style.backgroundColor = "#28a745";
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = "#f1c40f";
      }, 1500);
    }
  };

  // Ir para detalhes
  const handleDetails = (product) => {
    navigate(`/produto/${product.id}`);
  };

  if (loading) {
    return (
      <div className="container">
        <h2 className="title">Produtos Disponíveis</h2>
        <div className="loading">Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2 className="title">Produtos Disponíveis</h2>
        <div className="error">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container">
        <h2 className="title">Produtos Disponíveis</h2>
        <div className="no-products">Nenhum produto disponível no momento.</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="title">Produtos Disponíveis</h2>

      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <Carousel fade interval={2500}>
              {product.imagens && product.imagens.map((img, index) => (
                <Carousel.Item key={index} className="carouselItem">
                  <img src={img} alt={product.nome} className="image" />
                </Carousel.Item>
              ))}
            </Carousel>

            <h3>{product.nome}</h3>
            <p className="price">R$ {product.preco?.toFixed(2)}</p>
            {product.descricao && <p className="description">{product.descricao}</p>}

            <div className="buttons">
              <button className="buyNow" onClick={() => handleBuyNow(product)}>
                Comprar Agora
              </button>

              <button className="cart" onClick={(e) => handleAddToCart(product, e)}>
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}