import styles from "./BlocoEventosDestaque.module.scss";
import ListaEventosDestaque from "../../ListaEventosDestaque/ListaEventosDestaque.jsx";
import { Link } from "react-router-dom";
import { useGetEventos } from "../../../hooks/usuario/useGetEventos.js";
import Loading from "../../Loading/Loading.jsx";

const LIMITE_CARDS = 3;

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

const sortEventos = (a, b) => {
    const dateA = new Date(a.data).getTime();
    const dateB = new Date(b.data).getTime();

    if (dateB !== dateA) {
        return dateB - dateA; // Data mais recente primeiro
    }
    return b.id - a.id; // Se as datas forem iguais, usa o ID
};

function BlocoEventosDestaque() {
    const { eventos, loading, error } = useGetEventos();

    // Se a lista de eventos não existir ou estiver vazia, retorna um array vazio.
    const eventosDisponiveis = eventos || []; 

    // 1. FILTRAR E ORDENAR eventos destacados
    const destacadosOrdenados = eventosDisponiveis
        .filter(e => e.status === "destacado")
        .sort(sortEventos);

    // 2. FILTRAR E ORDENAR eventos publicados (não destacados)
    const publicadosOrdenados = eventosDisponiveis
        .filter(e => e.status === "publicado")
        .sort(sortEventos);

    // 3. COMBINAR E LIMITAR: Destacados primeiro, depois Publicados, limitando a 3.
    const eventosCombinados = [...destacadosOrdenados, ...publicadosOrdenados];
    const eventosLimitados = eventosCombinados.slice(0, LIMITE_CARDS);

    // 4. FORMATAR (map) os eventos finais
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