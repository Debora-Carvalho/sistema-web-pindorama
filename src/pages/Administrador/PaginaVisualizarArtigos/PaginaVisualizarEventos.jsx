import styles from './PaginaVisualizarEventos.module.scss';
import CardPadraoEventos from '../../../components/CardPadrao/Admin/CardPadraoEventos.jsx';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';

function PaginaVisualizarEventos() {
  const artigosFake = [
    { id: 1, titulo: "Inteligência Artificial no Brasil" },
    { id: 2, titulo: "Agricultura Sustentável" },
    { id: 3, titulo: "Cultura Afro-Brasileira" },
    { id: 4, titulo: "Eventos de Tecnologia 2025" },
    { id: 5, titulo: "Artes Visuais Contemporâneas" }
  ];

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
        <BarraPesquisa itens={artigosFake} onSelect={handleSelect} />
        <button className={styles.btnAdicionar} onClick={() => window.location.href = "/adm/criar-evento"}>
        <BiSolidAddToQueue className={styles.iconAdd} />
        </button>
      </div>
      <div className={styles.containerCards}>
       <CardPadraoEventos />
       <CardPadraoEventos />
       <CardPadraoEventos />
       <CardPadraoEventos />
       <CardPadraoEventos />
        <CardPadraoEventos />
      </div>
    </div>
  )
}

export default PaginaVisualizarEventos;
