import styles from './PaginaVisualizarEventos.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import Loading from '../../../components/Loading/Loading.jsx';
import { useGetEventos } from '../../../hooks/usuario/useGetEventos.js'
// Importação do componente de lista correto para eventos
import ListaEventos from '../../../components/ListaEventos/ListaEventos.jsx';

// Função auxiliar para formatar a data (DD / MMM)
const formatarData = (dataString) => {
    if (!dataString) return { dia: 'N/A', mes: 'N/A' };
    
    // Cria um objeto Date a partir da string (adicionando 'T00:00:00' para tratar como data UTC)
    const date = new Date(dataString + 'T00:00:00'); 
    
    // Obter o dia (DD)
    const dia = date.getDate().toString().padStart(2, '0');
    
    // Obter o mês abreviado (MMM) em português
    // Certifique-se de que a localização 'pt-BR' é suportada
    const mes = date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase().replace('.', ''); 
    
    return { dia, mes };
};


function PaginaVisualizarEventos() {
    useTituloDocumento("Eventos | Pindorama"); // mudando o Title da pagina
    const { eventos, loading, error } = useGetEventos();

    // Adaptando os eventos:
    // 1. Filtra apenas eventos com status "publicado".
    // 2. Formata a data para dia e mês.
    const eventosAdaptados = eventos
        .filter(e => e.status === "publicado")
        .map(evento => {
            const { dia, mes } = formatarData(evento.data);
            return {
                id: evento.id,
                dia: dia,
                mes: mes,
                titulo: evento.titulo,
                // O CardEvento precisará do link de visualização (se houver)
                // link: `/evento/${evento.id}` 
            };
        });

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Eventos</h2>
                    
                    {/* Componente de carregamento */}
                    {loading && <Loading />}
                    
                    {/* Mensagem de erro */}
                    {error && <p className={styles.mensagemErro}>Ocorreu um erro ao carregar os eventos: {error}</p>}
                    
                    {/* Lista de Eventos Adaptados */}
                    {!loading && !error && eventosAdaptados.length > 0 && (
                        <ListaEventos eventos={eventosAdaptados} />
                    )}

                    {/* Mensagem se não houver eventos publicados */}
                    {!loading && !error && eventosAdaptados.length === 0 && (
                        <p className={styles.mensagemVazio}>Nenhum evento público encontrado no momento.</p>
                    )}
                </main>

                <Footer />

            </div>
        </>
    );
}

export default PaginaVisualizarEventos;