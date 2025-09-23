import styles from "./ProximosEventos.module.scss";
import BlocoProximosEventos from "./BlocoProximosEventos/BlocoProximosEventos.jsx";

function ProximosEventos() {
    return (
        <div className={styles.container}>
            <h2>Próximos Eventos</h2>

            <BlocoProximosEventos />
        </div>
    );
};

export default ProximosEventos;