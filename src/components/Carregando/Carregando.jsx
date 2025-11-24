import { motion } from "framer-motion"
import styles from './Carregando.module.scss'

const containerVariants = {
    animate: {
        transition: {
            staggerChildren: 0.3,
            repeat: Infinity
        }
    }
}


const dotVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: [0, 1, 0, 1, 0],
        transition: {
            duration: 5,
            ease: "easeInOut"
        }
    }
};


function Carregando() {
    return (
        <motion.div
            className={styles.container}
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div className={styles.dot} variants={dotVariants} />
            <motion.div className={styles.dot} variants={dotVariants} />
            <motion.div className={styles.dot} variants={dotVariants} />
        </motion.div>
    )
}

export default Carregando;
