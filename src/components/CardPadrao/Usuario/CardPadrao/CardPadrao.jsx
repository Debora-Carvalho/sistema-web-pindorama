import React from "react";
import styles from "./CardPadrao.module.scss"; 
import { Link } from "react-router-dom";

function CardPadrao({ imagem, tipo, titulo, descricao, link }) {
    const botaoClasse =
        tipo === "artigo" ? styles.btnArtigo : styles.btnEvento;

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
                    {descricao}
                </p>

                <Link to={link} className={botaoClasse}>
                    {tipo === "artigo" ? "Ler artigo completo" : "Ver evento completo"}
                </Link>
            </div>
        </div>
    );
};

export default CardPadrao;
