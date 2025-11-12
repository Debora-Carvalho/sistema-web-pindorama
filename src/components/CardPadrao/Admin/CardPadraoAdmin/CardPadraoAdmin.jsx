import React from "react";
import styles from "./CardPadraoAdmin.module.scss";
import { Link } from "react-router-dom";

import DropdownCard from "./DropdownCard/DropdownCard.jsx";

function CardPadraoAdmin({ id, imagem, tipo, titulo, link, actions , status }) {
    const botaoClasse =
        tipo === "artigo" ? styles.btnArtigo : styles.btnEvento;

const backgroundClasse =
    tipo === "artigo"
        ? status === "rascunho"
            ? styles.backgroundRascunho
            : styles.backgroundArtigo
        : status === "rascunho"
            ? styles.backgroundEventoRascunho
            : styles.backgroundEvento;

    const tituloClasse =
        tipo === "artigo" ? styles.tituloArtigo : styles.tituloEvento;

    return (
        <div className={`${styles.card} ${backgroundClasse}`}>
            <div className={styles.cardImagem}>
                <img src={imagem} alt={`Capa do ${tipo} ${titulo}`} />
            </div>

            <div className={styles.dropdownOpcoesContainer}>
                <DropdownCard id={id} actions={actions} />
            </div>

            <div className={styles.cardConteudo}>
                <h3 className={`${styles.cardTitulo} ${tituloClasse}`}>
                    {titulo}
                </h3>

                {/* 
                    se acrescentar parágrafo de descrição, por favor insira "descricao" em props
                <p className={styles.cardDescricao}>
                    {descricao}
                </p> */}
                {/* Adicionando titulo do botão para rascunho */}
              <Link to={link} className={botaoClasse}> {status === "rascunho" ? tipo === "artigo" ? "Ler artigo de rascunho" : "Ler evento de rascunho" : tipo === "artigo" ? "Ler artigo completo" :"Ver evento completo"} </Link>
            </div>
        </div>
    );
};

export default CardPadraoAdmin;
