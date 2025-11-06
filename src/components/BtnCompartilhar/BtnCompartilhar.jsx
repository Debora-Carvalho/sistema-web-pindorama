import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegPaperPlane } from 'react-icons/fa';
import useMediaQuery from '../../hooks/useMediaQuery'
import styles from './BtnCompartilhar.module.scss';

// O componente recebe a classe do layout (grid-area) e a função de clique
function BtnCompartilhar({ onClick, className }) {

    // 1. Toda a lógica de animação foi movida para cá
    const [isHovered, setIsHovered] = useState(false);
    // Usamos 720px para o mobile, que é onde o estilo do botão muda no seu SCSS
    const isMobile = useMediaQuery('(max-width: 720px)'); 

    const buttonVariants = {
        initial: { width: '3.5rem', padding: '8px 40px', gap: '0rem' },
        hover: { width: '15rem', padding: '8px 20px', gap: '0.8rem' },
    };

    const textVariants = {
        initial: { opacity: 0, width: 0, x: -10 },
        hover: { opacity: 1, width: 'auto', x: 0 },
    };

    return (
        <motion.button
            // Combinamos a classe de layout da página com a classe de estilo do componente
            className={`${styles.botaoShare} ${className || ''}`}
            onMouseEnter={() => !isMobile && setIsHovered(true)} // Corrigido para não rodar hover em mobile
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            variants={buttonVariants}
            initial="initial"
            animate={isMobile || isHovered ? "hover" : "initial"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClick} // 2. Passa a função de clique recebida
        >
            <FaRegPaperPlane className={styles.faRegPaperPlane} />
            <motion.span
                className={styles.shareText}
                variants={textVariants}
                initial="initial"
                animate={isMobile || isHovered ? "hover" : "initial"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                Compartilhar
            </motion.span>
        </motion.button>
    );
}

export default BtnCompartilhar;