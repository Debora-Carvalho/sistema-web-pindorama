import styles from "./GaleriaFotos.module.scss";
import BlocoGaleriaFotos from "./BlocoGaleriaFotos/BlocoGaleriaFotos.jsx";
import { Link } from "react-router-dom";

function GaleriaFotos() {
    return (
        <div className={styles.container}>
            <div className={styles.containerTopo}>
                <h2>
                    Galeria
                </h2>

                <Link to="/visualizar-artigos" className={styles.btnVerMais}>
                    Ver mais
                </Link>
            </div>

            <BlocoGaleriaFotos />
        </div>
    );
};

export default GaleriaFotos;