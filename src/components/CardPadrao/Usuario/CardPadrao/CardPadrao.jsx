import React from "react";
import styles from "./CardPadrao.module.scss"; 
import { useNavigate } from "react-router-dom";

function CardPadrao({ imagem, tipo, titulo, descricao, link }) {
    const navigate = useNavigate(); 
    const botaoClasse =
        tipo === "artigo" ? styles.btnArtigo : styles.btnEvento;

    const handleClick = () => {
        navigate(link);
        window.scrollTo({ top: 0, behavior: "smooth" });
        //window.location.href = link; //Atualizando a tela assim que a url mudar OBS:  agora se eu comentar essa linha funciona, porem ão volta pra parte superor da tela
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
