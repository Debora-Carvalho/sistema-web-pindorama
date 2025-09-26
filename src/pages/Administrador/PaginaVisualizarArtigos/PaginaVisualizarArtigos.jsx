import { useEffect, useState } from "react";
import styles from './PaginaVisualizarArtigos.module.scss';
import CardPadraoArtigos from '../../../components/CardPadrao/Admin/CardPadraoArtigos.jsx';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';
import { useArtigos } from '../../../hooks/artigos/useArtigos.js';

function PaginaVisualizarArtigosAdmin() {
    const { listarArtigos, deletarArtigo, loading, erro } = useArtigos();
    const [artigos, setArtigos] = useState([]);

    useEffect(() => {
      async function carregar() {
        try {
          const data = await listarArtigos();
          setArtigos(data);
        } catch (e) {
          console.error(e);
        }
      }
      carregar();
    }, []);

    
    const handleExcluir = async (id) => {
      await deletarArtigo(id);
      setArtigos((prev) => prev.filter((a) => a.id !== id));
    };

    const handleEditar = (id) => {
      //window.location.href = `/adm/editar-artigo/${id}`;
    };

    const handleSelect = (item) => {
        console.log("Selecionado:", item);
        alert(`Você selecionou: ${item.titulo}`);
    };

    return (
        <div className={styles.containerVisualizar}>
            <img className={styles.logo} src={Logo} alt="Logo do Pindorama" />
            <nav className={styles.navbar}>
                <HeaderAdmin />
            </nav>
            <div className={styles.topo}>
                <BarraPesquisa itens={artigos} onSelect={handleSelect} />
                <button className={styles.btnAdicionar} onClick={() => window.location.href = "/adm/criar-artigo"}>
                    <BiSolidAddToQueue className={styles.iconAdd} />
                </button>
            </div>
            <div className={styles.containerCards}>
            {loading && <p>Carregando artigos...</p>}
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            {artigos.map((artigo) => (
              <CardPadraoArtigos
                key={artigo.id}
                id={artigo.id}
                titulo={artigo.titulo}
                imagem={artigo.url_imagem}
                onExcluir={handleExcluir}
                onEditar={handleEditar}
              />
            ))}
            </div>
        </div>
    )
}

export default PaginaVisualizarArtigosAdmin;
