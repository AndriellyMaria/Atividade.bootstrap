import { useNavigate } from "react-router-dom";
import "./BotaoVoltar.css";

function BotaoVoltar() {
  const navigate = useNavigate();

  return (
    <button className="botao-voltar" onClick={() => navigate(-1)}>
      ← Voltar
    </button>
  );
}

export default BotaoVoltar;
