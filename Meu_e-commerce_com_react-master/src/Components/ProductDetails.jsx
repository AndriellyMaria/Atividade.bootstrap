import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const docRef = doc(db, "produtos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
          setError(null);
        } else {
          setError("Produto não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        setError("Erro ao carregar produto. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Por favor, faça login para adicionar produtos ao carrinho!");
      navigate("/login");
      return;
    }
    
    // Adiciona o produto com a quantidade especificada
    const productToAdd = { ...product, quantity };
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    
    alert(`${quantity}x ${product.nome} adicionado(s) ao carrinho!`);
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("Por favor, faça login para finalizar a compra!");
      navigate("/login");
      return;
    }
    
    // Adiciona ao carrinho e vai para checkout
    const productToAdd = { ...product, quantity };
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    
    navigate("/checkout");
  };

  if (loading) return <div className="loading">Carregando produto...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>Produto não encontrado.</div>;

  return (
    <div className="product-details" style={styles.container}>
      <div style={styles.productContent}>
        <div style={styles.imagesSection}>
          {product.imagens && product.imagens.length > 0 ? (
            <Carousel fade interval={3000}>
              {product.imagens.map((img, index) => (
                <Carousel.Item key={index}>
                  <img 
                    src={img} 
                    alt={`${product.nome} ${index + 1}`}
                    style={styles.productImage}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <img 
              src="/placeholder.jpg" 
              alt={product.nome}
              style={styles.productImage}
            />
          )}
        </div>

        <div style={styles.infoSection}>
          <h1 style={styles.productName}>{product.nome}</h1>
          <p style={styles.price}>R$ {product.preco?.toFixed(2)}</p>
          <p style={styles.description}>{product.descricao}</p>
          
          {product.quantidade && (
            <p style={styles.stock}>
              <strong>Estoque:</strong> {product.quantidade} unidades
            </p>
          )}

          <div style={styles.quantitySelector}>
            <label style={styles.quantityLabel}>Quantidade:</label>
            <div style={styles.quantityControl}>
              <button 
                style={styles.quantityButton}
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span style={styles.quantityNumber}>{quantity}</span>
              <button 
                style={styles.quantityButton}
                onClick={() => setQuantity(prev => prev + 1)}
                disabled={product.quantidade && quantity >= product.quantidade}
              >
                +
              </button>
            </div>
          </div>

          <div style={styles.actionButtons}>
            <button 
              style={styles.buyNowButton}
              onClick={handleBuyNow}
            >
              <i className="bi bi-lightning-fill" style={{marginRight: '10px'}}></i>
              Comprar Agora
            </button>

            <button 
              style={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus" style={{marginRight: '10px'}}></i>
              Adicionar ao Carrinho
            </button>
          </div>

          <div style={styles.features}>
            <div style={styles.feature}>
              <i className="bi bi-truck" style={styles.featureIcon}></i>
              <span>Entrega para todo Brasil</span>
            </div>
            <div style={styles.feature}>
              <i className="bi bi-shield-check" style={styles.featureIcon}></i>
              <span>Compra 100% segura</span>
            </div>
            <div style={styles.feature}>
              <i className="bi bi-arrow-counterclockwise" style={styles.featureIcon}></i>
              <span>Garantia de 7 dias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Estilos inline
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  productContent: {
    display: 'flex',
    gap: '40px',
    marginBottom: '40px',
  },
  imagesSection: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: '500px',
    objectFit: 'contain',
    background: '#f8f9fa',
    borderRadius: '12px',
  },
  infoSection: {
    flex: 1,
  },
  productName: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '15px',
  },
  price: {
    fontSize: '2.5rem',
    color: '#0d6efd',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.1rem',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '25px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee',
  },
  stock: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '25px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  quantitySelector: {
    marginBottom: '30px',
  },
  quantityLabel: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: '500',
    color: '#333',
  },
  quantityControl: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '5px',
  },
  quantityButton: {
    width: '40px',
    height: '40px',
    border: 'none',
    background: '#f8f9fa',
    borderRadius: '6px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityNumber: {
    minWidth: '50px',
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
  },
  buyNowButton: {
    flex: 1,
    padding: '15px',
    background: '#0d6efd',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s',
  },
  addToCartButton: {
    flex: 1,
    padding: '15px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#666',
  },
  featureIcon: {
    color: '#0d6efd',
    fontSize: '1.2rem',
  },
};