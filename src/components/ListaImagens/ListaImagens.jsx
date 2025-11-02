import React from "react";
import styles from "./ListaImagens.module.scss";

import CardImagem from "../CardPadrao/Usuario/CardImagem/CardImagem.jsx";
import { decodeHtml } from "../../../Helpers/decodeHtml.js";

function ListaImagens({ imagens, limite }) {
    const imagensExibidas = Array.isArray(imagens)
        ? (limite ? imagens.slice(0, limite) : imagens)
        : [];

    console.log(imagensExibidas)
    return (
        <div className={styles.gradeGaleria}>
            {imagensExibidas.map((item) => (
                <CardImagem
                    key={item.id}
                    imagem={item.imagem}
                    titulo={item.titulo}
                    descricao={decodeHtml(item.descricao)}
                    link={item.link}
                />
            ))}
        </div>
    );
}

export default ListaImagens;
