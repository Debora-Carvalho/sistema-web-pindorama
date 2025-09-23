import styles from "./ArtigosDestaque.module.scss";
import BlocoArtigosDestaque from "./BlocoArtigosDestaque/BlocoArtigosDestaque.jsx";
import { Link } from "react-router-dom";

function ArtigosDestaque() {
    return (
        <div className={styles.container}>
            <div className={styles.containerTopo}>
                <h2>
                    Destaques
                </h2>

                <Link to="/visualizar-artigos" className={styles.btnVerMais}>
                    Ver mais
                </Link>
            </div>

            <BlocoArtigosDestaque />
        </div>
    );
};

export default ArtigosDestaque;