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
    const { eventos, loading, error } = useGetEventos();

    const eventosLimitados = eventos ? eventos.slice(0, 3) : [];

    const eventosFormatados = eventosLimitados.map(evento => ({
        ...evento,
        ...formatarDataEvento(evento.data),
        link:`/detalhes-evento/${evento.id}`
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