import styles from './ListaCardsAdmin.module.scss';
import CardPadraoAdmin from "../../CardPadrao/Admin/CardPadraoAdmin/CardPadraoAdmin.jsx";

function ListaCardsAdmin({ cards, limite }) {
    const cardsFiltrados = limite ? cards.slice(0, limite) : cards;

    return (
        <div className={styles.gridCards}>
            {cardsFiltrados.map((card, index) => (
                <CardPadraoAdmin
                    key={index}
                    tipo={card.tipo}
                    imagem={card.imagem}
                    titulo={card.titulo}
                    link={card.link}
                />
            ))}
        </div>
    );
}

export default ListaCardsAdmin;
