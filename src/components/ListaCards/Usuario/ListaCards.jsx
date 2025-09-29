import styles from './ListaCards.module.scss';
import CardPadrao from "../../CardPadrao/Usuario/CardPadrao/CardPadrao.jsx";

function ListaCards({ cards, limite }) {
    const cardsFiltrados = limite ? cards.slice(0, limite) : cards;

    return (
        <div className={styles.gridCards}>
            {cardsFiltrados.map((card) => (
                <CardPadrao
                    key={card.id} 
                    tipo={card.tipo}
                    imagem={card.url_imagem}
                    titulo={card.titulo}
                    descricao={card.conteudo.replace(/<[^>]+>/g, '')}
                    link={card.link}
                />
            ))}
        </div>
    );
}

export default ListaCards;
