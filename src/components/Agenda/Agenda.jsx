import styles from "./Agenda.module.scss";
import Calendario from "./Calendario/Calendario.jsx";
import IconCactoApoio from "../../assets/icons/icon-cacto-apoio-agenda.png";

function Agenda() {
    return (
        <div className={styles.container}>
            <h2>Agenda</h2>

            <Calendario />

            <img src={IconCactoApoio} alt="Ícone de cacto" className={styles.iconCactoApoio} />
            <div className={styles.lineIconCactoApoio}/>
        </div>
    );
};

export default Agenda;