import styles from "./ArtigosDestaque.module.scss";

import { Link } from "react-router-dom";

import artigos from "../../../json/db-mock-artigos.json";
import ListaCards from "../../ListaCards/ListaCards.jsx";

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

            <ListaCards cards={artigos} limite={3} />
        </div>
    );
};

export default ArtigosDestaque;