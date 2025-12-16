import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Produto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarProduto() {
      try {
        const docRef = doc(db, "produtos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduto(docSnap.data());
        } else {
          setErro("Produto não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        setErro("Erro ao buscar produto.");
      } finally {
        setCarregando(false);
      }
    }

    buscarProduto();
  }, [id]);

  if (carregando) return <p>Carregando produto...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div>
      <h1>{produto.nome}</h1>
      <p><strong>Descrição:</strong> {produto.descricao}</p>
      <p><strong>Preço:</strong> R$ {produto.preco}</p>
      <p><strong>Quantidade em estoque:</strong> {produto.quantidade}</p>
    </div>
  );
}

export default Produto;