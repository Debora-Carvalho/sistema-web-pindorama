import React, { useState, useEffect } from 'react';
import styles from './PopupCompartilhar.module.scss';
import { FaRegCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';

function PopupCompartilhar({ aoFechar, link, imagem }) {
    const [foiCopiado, setFoiCopiado] = useState(false);

    const lidarComCopia = () => {
        navigator.clipboard.writeText(link).then(() => {
            setFoiCopiado(true);
        });
    };

    useEffect(() => {
        if (foiCopiado) {
            const timer = setTimeout(() => {
                setFoiCopiado(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [foiCopiado]);

    const variantesFundo = {
        visivel: { opacity: 1 },
        oculto: { opacity: 0 },
    };

    const variantesPopup = {
        visivel: { scale: 1, opacity: 1, transition: { delay: 0.1 } },
        oculto: { scale: 0.9, opacity: 0 },
    };

    return (
        <motion.div 
            className={styles.fundoPopup} 
            onClick={aoFechar}
            variants={variantesFundo}
            initial="oculto"
            animate="visivel"
            exit="oculto"
        >
            <motion.div 
                className={styles.popup} 
                onClick={(e) => e.stopPropagation()}
                variants={variantesPopup}
            >
                <div className={styles.ladoEsquerdo}>
                    <h3>Compartilhe este artigo</h3>
                    <p>Copie o link abaixo para compartilhar com seus amigos.</p>
                    <div className={styles.containerLink}>
                        <input type="text" value={link} readOnly />
                        <button onClick={lidarComCopia}>
                            {foiCopiado ? 'Copiado!' : <FaRegCopy />}
                        </button>
                    </div>
                    <button className={styles.botaoFechar} onClick={aoFechar}>
                        Fechar
                    </button>
                </div>

                <div className={styles.ladoDireito}>
                    <img src={imagem} alt="Capa do Artigo" />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default PopupCompartilhar;