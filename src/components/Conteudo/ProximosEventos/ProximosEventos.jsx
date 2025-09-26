import styles from "./ProximosEventos.module.scss";

import eventos from "../../../json/db-mock-eventos.json";
import ListaCards from "../../ListaCards/Usuario/ListaCards.jsx";

function ProximosEventos() {
    return (
        <div className={styles.container}>
            <h2>
                Próximos Eventos
            </h2>

            <ListaCards cards={eventos} limite={3} />
        </div>
    );
};

export default ProximosEventos;