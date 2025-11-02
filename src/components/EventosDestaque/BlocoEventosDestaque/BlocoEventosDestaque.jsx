import styles from "./BlocoEventosDestaque.module.scss";
import ListaEventosDestaque from "../../ListaEventosDestaque/ListaEventosDestaque.jsx";
import { Link } from "react-router-dom";
import { useGetEventos } from "../../../hooks/usuario/useGetEventos.js";
import Loading from "../../Loading/Loading.jsx";

const formatarDataEvento = (dataString) => {
    const data = new Date(dataString);
    const meses = [
        'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
        'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
    ];

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = meses[data.getMonth()];

    return { dia, mes };
};

function BlocoEventosDestaque() {
    // const mockEventosDestaque = [
    // 	{ id: 1, dia: '10', mes: 'SET', titulo: 'Palestra na FATEC Ipiranga' },
    // 	{ id: 2, dia: '21', mes: 'OUT', titulo: 'Palestra na Expo Cultura' },
    // 	{ id: 3, dia: '04', mes: 'AGO', titulo: 'Apresentação na ETEC Itaquera' },
    // ];
    const { eventos, loading, error } = useGetEventos();

    const eventosLimitados = eventos ? eventos.slice(0, 3) : [];

    const eventosFormatados = eventosLimitados.map(evento => ({
        ...evento,
        ...formatarDataEvento(evento.data)
    }));

    return (
        <div className={styles.container}>
            {loading ? (
                <Loading/>
            ) : error ? (
                <p>Erro ao carregar os eventos: {error}</p>
            ) : (
                <ListaEventosDestaque eventos={eventosFormatados} />
            )}
            <Link to='/eventos' className={styles.btnTodosEventos}>
                Ver agenda completa
            </Link>
        </div>
    );
};

export default BlocoEventosDestaque;