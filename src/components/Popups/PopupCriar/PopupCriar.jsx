import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PopupCriar.module.scss';

import { AiOutlineClose } from "react-icons/ai";

function PopupCriar({ aberto, onFechar }) {
    if (!aberto) return null;

    return (
        <div className={styles.popupOverlayCriar}>
            <div className={styles.popupBoxCriar}>
                <button 
                    className={styles.btnFechar}
                    onClick={onFechar}
                >
                    <AiOutlineClose />
                </button>

                <p>O que deseja criar?</p>
                <div className={styles.popupActions}>
                    <Link to="/adm/criar-artigo">
                        <button className={styles.btnLinkArtigos}>
                            Artigos
                        </button>
                    </Link>
                    <Link to="/adm/criar-evento">
                        <button className={styles.btnLinkEventos}>
                            Eventos
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PopupCriar;
