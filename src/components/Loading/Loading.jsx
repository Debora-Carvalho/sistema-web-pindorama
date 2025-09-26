import { motion } from "framer-motion";
import arara from "../../assets/icons/icon-arara-azul.png";

export default function Loading() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: 'column',                
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background: "var(--background-primary)",
            }}
        >
            <motion.img
                src={arara}
                alt="Ícone de arara azul"
                style={{ width: 140 }}
                animate={{
                    y: [0, -30, 0],
                    x: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <p
                style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '1.2rem',
                    color: 'var(--secondary-600)',
                }}
            >
                Carregando riquezas do Brasil...
            </p>
        </div>
    );
};
