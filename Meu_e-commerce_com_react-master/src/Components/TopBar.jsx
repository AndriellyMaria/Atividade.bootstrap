import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <Navbar bg="light" expand="lg" className="px-3 shadow-sm" fixed="top">
      <Container fluid>

        {/* Logo / Nome */}
        <Navbar.Brand as={Link} to="/">
          Artes a Nato
        </Navbar.Brand>

        {/* Barra de pesquisa */}
        <Form
          className="d-flex mx-auto"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <Form.Control
            type="search"
            placeholder="Pesquisar produtos..."
            className="me-2"
          />
          <Button variant="primary">Buscar</Button>
        </Form>

        {/* Ícone de carrinho */}
        <Link to="/cart" className="ms-4" style={{ color: "black" }}>
          <i className="bi bi-cart-fill" style={{ fontSize: "1.8rem" }}></i>
        </Link>

      </Container>
    </Navbar>
  );
}

export default TopBar;
