import { motion } from "framer-motion"
import styles from './Carregando.module.scss'

const dotVariants = {
    jump: {
        y: -30,
        transition: { duration: 0.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
    }
}

const containerVariants = {
    animate: {
        transition: { staggerChildren: 0.2 }
    }
}

function Carregando() {
    return (
        <motion.div className={styles.container} variants={containerVariants} animate="animate">

            <motion.div className={styles.dot} variants={dotVariants} />
            <motion.div className={styles.dot} variants={dotVariants} />
            <motion.div className={styles.dot} variants={dotVariants} />

        </motion.div>
    )
}

export default Carregando;
