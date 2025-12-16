import { NavLink } from "react-router-dom";
import {
  BsChatDotsFill,
  BsFillBellFill,
  BsFillPersonFill,
  BsExclamationCircleFill
} from "react-icons/bs";
import "./Navigation.css";


function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/chat" className="nav-item">
        <BsChatDotsFill className="nav-icon" />
        Chat
      </NavLink>

      <NavLink to="/notificacoes" className="nav-item">
        <BsFillBellFill className="nav-icon" />
        Notificações
      </NavLink>

      <NavLink to="/perfil" className="nav-item">
        <BsFillPersonFill className="nav-icon" />
        Perfil
      </NavLink>

      <NavLink to="/suporte" className="nav-item">
        <BsExclamationCircleFill className="nav-icon" />
        Suporte
      </NavLink>
    </nav>
  );
}

export default Navigation;