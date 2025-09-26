import styles from './ListaCards.module.scss';
import CardPadrao from "../../CardPadrao/Usuario/CardPadrao/CardPadrao.jsx";

function ListaCards({ cards, limite }) {
    const cardsFiltrados = limite ? cards.slice(0, limite) : cards;

    return (
        <div className={styles.gridCards}>
            {cardsFiltrados.map((card, index) => (
                <CardPadrao
                    key={index}
                    tipo={card.tipo}
                    imagem={card.imagem}
                    titulo={card.titulo}
                    descricao={card.descricao}
                    link={card.link}
                />
            ))}
        </div>
    );
}

export default ListaCards;
