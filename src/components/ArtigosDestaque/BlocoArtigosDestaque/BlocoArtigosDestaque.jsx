import styles from "./BlocoArtigosDestaque.module.scss";
import CardPadrao from "../../CardPadrao/Usuario/CardPadrao/CardPadrao";
import ImgBannerArtigoCordel from "../../../assets/images/img-banner-artigo-cordel.png";

function BlocoArtigosDestaque() {
    return (
        <div className={styles.container}>
            <CardPadrao 
                imagem={ImgBannerArtigoCordel}
                tipo='artigo'
                titulo='A literatura de cordel no dia a dia'
                descricao='A importância de implementar o cordel na educação infantil nas escolas do Brasil'
            />
            <CardPadrao 
                imagem={ImgBannerArtigoCordel}
                tipo='artigo'
                titulo='A literatura de cordel no dia a dia'
                descricao='A importância de implementar o cordel na educação infantil nas escolas do Brasil'
            />
            <CardPadrao 
                imagem={ImgBannerArtigoCordel}
                tipo='artigo'
                titulo='A literatura de cordel no dia a dia'
                descricao='A importância de implementar o cordel na educação infantil nas escolas do Brasil'
            />
        </div>
    );
};

export default BlocoArtigosDestaque;