import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const { user, loginWithGoogle, loginWithMicrosoft } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redireciona se já estiver logado
    }
  }, [user, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Faça login para continuar</h2>
        <p style={styles.subtitle}>Entre para adicionar produtos ao carrinho e finalizar compras</p>
        
        <div style={styles.buttons}>
          <button 
            style={styles.googleButton}
            onClick={loginWithGoogle}
          >
            <i className="bi bi-google" style={{marginRight: '10px'}}></i>
            Entrar com Google
          </button>
          
          <button 
            style={styles.microsoftButton}
            onClick={loginWithMicrosoft}
          >
            <i className="bi bi-microsoft" style={{marginRight: '10px'}}></i>
            Entrar com Microsoft
          </button>
        </div>
        
        <div style={styles.info}>
          <p><small>Precisa de ajuda? <a href="/suporte">Entre em contato</a></small></p>
        </div>
      </div>
    </div>
  );
}

// Estilos inline para não precisar de arquivo CSS
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70vh',
    padding: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    color: '#666',
    marginBottom: '30px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  googleButton: {
    padding: '12px 20px',
    background: '#fff',
    color: '#757575',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  microsoftButton: {
    padding: '12px 20px',
    background: '#00a4ef',
    color: 'white',
    border: '2px solid #00a4ef',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  info: {
    marginTop: '25px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  },
};