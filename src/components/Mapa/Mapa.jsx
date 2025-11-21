import { useEffect, useState } from "react";
import PopupMapa from "../Popups/PopupMapa/PopupMapa.jsx";
import LegendaMapa from './LegendaMapa/LegendaMapa.jsx';

export default function Mapa() {
    const [popupAberto, setPopupAberto] = useState(false);
    const [artigoSelecionado, setArtigoSelecionado] = useState(null);


    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === "abrirPopupArtigo") {
                const artigo = event.data.data;

                setArtigoSelecionado({
                    titulo: artigo.titulo,
                    conteudo: artigo.conteudo
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
        <>
            <iframe
                // Quando hospedar trocar 
                src="http://localhost:8000/mapa/"
                style={{
                    width: "100%",
                    height: "90vh",
                    border: "none",
                    display: "block"
                }}
                title="Mapa com Artigos"
            />

            <LegendaMapa />

            <PopupMapa
                aberto={popupAberto}
                titulo={artigoSelecionado?.titulo || ""}
                descricao={artigoSelecionado?.conteudo || ""}
                textoBotao="Fechar"
                onFechar={() => setPopupAberto(false)}
            />
        </>
    );
}
