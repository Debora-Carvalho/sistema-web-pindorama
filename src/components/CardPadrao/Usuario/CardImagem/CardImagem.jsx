import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CardImagem.module.scss";

import { MdOutlineArrowForward } from "react-icons/md";

function CardImagem({ imagem, titulo, descricao, link }) {
    const [open, setOpen] = useState(false);
    
    //console.log("CardImagem props:", { imagem, titulo, descricao, link });
    return (
        <>
            <div
                className={styles.cardImagem}
                onClick={() => setOpen(true)}
                >
                <div className={styles.imagemWrapper}>
                    <img src={imagem} alt={titulo} title={`Clique para ver mais sobre ${titulo}`} />
                </div>
            </div>

            {open && (
                <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <img src={imagem} alt={titulo} className={styles.modalImage} />

                        <p className={styles.modalTitulo}>
                            {titulo}
                        </p>

                        <div className={styles.modalText}>    
                            {descricao && <p>{descricao}</p>}
                        </div>

                        <div className={styles.groupBtnModal}>
                            <button onClick={() => setOpen(false)} className={styles.btnModalFechar}>
                                Voltar
                            </button>

                            <Link to={link} className={styles.btnModalLink}>
                                Ver conteúdo relacionado

                                <MdOutlineArrowForward className={styles.btnModalIcon} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CardImagem;
