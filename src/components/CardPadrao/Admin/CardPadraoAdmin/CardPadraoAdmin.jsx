import React from "react";
import styles from "./CardPadraoAdmin.module.scss";
import { Link } from "react-router-dom";

import DropdownCard from "./DropdownCard/DropdownCard.jsx";

function CardPadraoAdmin({ imagem, tipo, titulo, link }) {
    const botaoClasse =
        tipo === "artigo" ? styles.btnArtigo : styles.btnEvento;

    return (
        <div className={styles.card}>
            <div className={styles.cardImagem}>
                <img src={imagem} alt={`Capa do ${tipo} ${titulo}`} />
            </div>

            <div className={styles.dropdownOpcoesContainer}>
                <DropdownCard />
            </div>

            <div className={styles.cardConteudo}>
                <h3 className={styles.cardTitulo}>
                    {titulo}
                </h3>

                {/* 
                    se acrescentar parágrafo de descrição, por favor insira "descricao" em props
                <p className={styles.cardDescricao}>
                    {descricao}
                </p> */}

                <Link to={link} className={botaoClasse}>
                    {tipo === "artigo" ? "Ler artigo completo" : "Ver evento completo"}
                </Link>
            </div>
        </div>
    );
};

export default CardPadraoAdmin;
