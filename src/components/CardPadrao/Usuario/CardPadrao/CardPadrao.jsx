import React from "react";
import styles from "./CardPadrao.module.scss"; 
import { useNavigate } from "react-router-dom";

function CardPadrao({ imagem, tipo, titulo, descricao, link }) {
    const navigate = useNavigate(); 
    const botaoClasse =
        tipo === "artigo" ? styles.btnArtigo : styles.btnEvento;

    const handleClick = () => {
      navigate(link);
    };
    return (
        <div className={styles.card}>
            <div className={styles.cardImagem}>
                <img src={imagem} alt={`Capa do ${tipo} ${titulo}`}/>
            </div>

            <div className={styles.cardConteudo}>
                <h3 className={styles.cardTitulo}>
                    {titulo}
                </h3>

                <p className={styles.cardDescricao}>
                    {descricao.length > 150 ? descricao.slice(0, 150) + "…ver mais" : descricao}
                </p>

                <button onClick={handleClick} className={botaoClasse}>
                    {tipo === "artigo" ? "Ler artigo completo" : "Ver evento completo"}
                </button>
                
            </div>
        </div>
    );
};

export default CardPadrao;
