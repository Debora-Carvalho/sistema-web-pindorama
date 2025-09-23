import styles from "./BlocoProximosEventos.module.scss";
import CardPadrao from "../../CardPadrao/Usuario/CardPadrao/CardPadrao";

function BlocoProximosEventos() {
    return (
        <div className={styles.container}>
            <CardPadrao 
                imagem='https://institutoagoraeducacao.com/wp-content/uploads/2018/07/palestras-header.jpg'
                tipo='evento'
                titulo='Palestra na Expo Patrimônio'
                descricao='Assuntos como cultura e pertencimento serão abordados'
            />
            <CardPadrao 
                imagem='https://img.freepik.com/fotos-premium/retrato-de-uma-lider-de-equipe-feminina-atraente-e-sorridente-em-vestido-formal-em-pe-em-um-workp-moderno_1059911-54134.jpg'
                tipo='evento'
                titulo='Palestra na Expo Patrimônio'
                descricao='Assuntos como cultura e pertencimento serão abordados'
            />
            <CardPadrao 
                imagem='https://img.freepik.com/fotos-premium/mulher-de-negocios-afro-americana-a-ouvir-uma-apresentacao-de-negocios_662214-344295.jpg'
                tipo='evento'
                titulo='Palestra na Expo Patrimônio'
                descricao='Assuntos como cultura e pertencimento serão abordados'
            />
        </div>
    );
};

export default BlocoProximosEventos;