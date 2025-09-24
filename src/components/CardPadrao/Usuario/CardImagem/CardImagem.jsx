import React from "react";
import styles from "./CardImagem.module.scss";

function CardImagem({ imagem, titulo }) {
    return (
        <div className={styles.cardImagem}>
            <div className={styles.imagemWrapper}>
                <img src={imagem} alt={titulo} />
            </div>
        </div>
    );
}

export default CardImagem;
