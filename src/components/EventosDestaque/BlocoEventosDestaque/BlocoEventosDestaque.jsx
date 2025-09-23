import styles from "./BlocoEventosDestaque.module.scss";
import ListaEventosDestaque from "../../ListaEventosDestaque/ListaEventosDestaque.jsx";
import { Link } from "react-router-dom";

function BlocoEventosDestaque() {
    const mockEventosDestaque = [
		{ id: 1, dia: '10', mes: 'SET', titulo: 'Palestra na FATEC Ipiranga' },
		{ id: 2, dia: '21', mes: 'OUT', titulo: 'Palestra na Expo Cultura' },
		{ id: 3, dia: '04', mes: 'AGO', titulo: 'Apresentação na ETEC Itaquera' },
	];

    return (
        <div className={styles.container}>
            <ListaEventosDestaque eventos={mockEventosDestaque} />

            <Link to='/visualizar-eventos' className={styles.btnTodosEventos}>
                Ver agenda completa
            </Link>
        </div>
    );
};

export default BlocoEventosDestaque;