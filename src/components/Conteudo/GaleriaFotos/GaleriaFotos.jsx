import styles from "./GaleriaFotos.module.scss";
import { Link } from "react-router-dom";

import ListaImagens from "../../ListaImagens/ListaImagens.jsx";

function GaleriaFotos() {
    return (
        <div className={styles.container}>
            <div className={styles.containerTopo}>
                <h2>
                    Galeria de fotos
                </h2>

                <Link to="/galeria" className={styles.btnVerMais}>
                    Ver mais
                </Link>
            </div>

            <ListaImagens limite={4} />

        </div>
    );
};

export default GaleriaFotos;