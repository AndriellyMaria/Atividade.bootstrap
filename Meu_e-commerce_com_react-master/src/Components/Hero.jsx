import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <h2>Compre aqui todo tipo de artesanato</h2>
      <p>Navegue por nossos produtos e se encante com cada produto, cada peça, cada detalhe feito a mão.</p>

      <Link to="/store">
        <Button variant="primary">Vamos às compras</Button>
      </Link>
    </section>
  );
}

export default Hero;
