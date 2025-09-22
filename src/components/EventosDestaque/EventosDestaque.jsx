import styles from "./EventosDestaque.module.scss";
import BlocoEventosDestaque from "./BlocoEventosDestaque/BlocoEventosDestaque.jsx";

function EventosDestaque() {
    return (
        <div className={styles.container}>
            <h2>Eventos Destaque</h2>

            <BlocoEventosDestaque />
        </div>
    );
};

export default EventosDestaque;