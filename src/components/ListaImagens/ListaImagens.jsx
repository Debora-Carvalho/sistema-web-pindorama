import React from "react";
import styles from "./ListaImagens.module.scss";

import CardImagem from "../CardPadrao/Usuario/CardImagem/CardImagem.jsx";
import imagens from "../../json/db-mock-imagens.json";

function ListaImagens({ limite }) {
    const imagensExibidas = limite ? imagens.slice(0, limite) : imagens;

    return (
        <div className={styles.gradeGaleria}>
            {imagensExibidas.map((img) => (
                <CardImagem
                    key={img.id}
                    imagem={img.imagem}
                    titulo={img.titulo}
                    descricao={img.descricao}
                    link={img.link}
                />
            ))}
        </div>
    );
}

export default ListaImagens;
