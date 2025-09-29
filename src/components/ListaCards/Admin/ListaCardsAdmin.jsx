import styles from './ListaCardsAdmin.module.scss';
import CardPadraoAdmin from "../../CardPadrao/Admin/CardPadraoAdmin/CardPadraoAdmin.jsx";

function ListaCardsAdmin({ cards, limite, actions }) {
    const cardsFiltrados = limite ? cards.slice(0, limite) : cards;

    return (
        <div className={styles.gridCards}>
            {cardsFiltrados.map((card) => (
                <CardPadraoAdmin
                    key={card.id}
                    id={card.id}
                    tipo={card.tipo}
                    imagem={card.url_imagem}
                    titulo={card.titulo}
                    link={card.link}
                    actions={actions}
                    status={card.status}
                />
            ))}
        </div>
    );
}

export default ListaCardsAdmin;
