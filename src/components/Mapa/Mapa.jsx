import { useEffect, useState } from "react";
import PopupMapa from "../Popups/PopupMapa/PopupMapa.jsx";
import LegendaMapa from './LegendaMapa/LegendaMapa.jsx';
import Loading from "../Loading/Loading.jsx";//loading
import { decodeHtml } from "../../Helpers/decodeHtml.js";
const API_MAPA = import.meta.env.VITE_API_MAPA_URL;

export default function Mapa() {
    const [popupAberto, setPopupAberto] = useState(false);
    const [artigoSelecionado, setArtigoSelecionado] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); //loading

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === "abrirPopupArtigo") {
                const artigo = event.data.data;

                setArtigoSelecionado({
                    titulo: artigo.titulo,
                    conteudo: decodeHtml(artigo.conteudo)
                });
                setPopupAberto(true);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    return (
      // loading espaço e piriquito embaixo
        <div style={{ position: 'relative', height: '90vh' }}>
            {!isLoaded && <Loading />} 
            <iframe 
                // Quando hospedar trocar 
                src={API_MAPA}
                onLoad={() => setIsLoaded(true)}
                style={{
                    width: "100%",
                    height: "90vh",
                    border: "none",
                    display: isLoaded ? "block" : "none" //loading
                }}
                title="Mapa com Artigos"
            />
            {/* Loading */}
            {isLoaded && <LegendaMapa />} 

            <PopupMapa
                aberto={popupAberto}
                titulo={artigoSelecionado?.titulo || ""}
                descricao={artigoSelecionado?.conteudo || ""}
                textoBotao="Fechar"
                onFechar={() => setPopupAberto(false)}
            />
        </div>
    );
}
