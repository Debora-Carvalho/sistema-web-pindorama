import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import L from "leaflet";
import brasilEstados from "../../json/brasil_geo.json";
import patrimonioData from "../../json/db-mock-pontos-mapa.json";
import PopupMapa from '../Popups/PopupMapa/PopupMapa.jsx';

// Ícones dos pontos culturais
const icons = {
    musica: new L.Icon({ iconUrl: "/icons/musica.svg", iconSize: [30, 30] }),
    culinaria: new L.Icon({ iconUrl: "/icons/culinaria.svg", iconSize: [30, 30] }),
    dança: new L.Icon({ iconUrl: "/icons/danca.svg", iconSize: [30, 30] }),
    indigena: new L.Icon({ iconUrl: "/icons/indigena.svg", iconSize: [30, 30] }),
    afro: new L.Icon({ iconUrl: "/icons/afro.svg", iconSize: [30, 30] }),
    monumento: new L.Icon({ iconUrl: "/icons/monumento.svg", iconSize: [30, 30] }),
    conto: new L.Icon({ iconUrl: "/icons/conto.svg", iconSize: [30, 30] }),
    default: new L.Icon({ iconUrl: "/icons/default-pin.svg", iconSize: [30, 30] }),
};

const getIcon = (tipo) => icons[tipo] || icons.default;

// estilos definidos no GeoJSON
const estiloEstado = (feature) => ({
    color: feature.properties["stroke"] || "#333",
    weight: feature.properties["stroke-width"] || 1,
    fillColor: feature.properties["fill-color"] || "#ccc",
    fillOpacity: feature.properties["fill-opacity"] || 0.7,
});

// interações ao passar o mouse
const interacoesEstado = (feature, layer) => {
    layer.on({
        mouseover: (e) => e.target.setStyle({ weight: 2, color: "#000", fillOpacity: 0.9 }),
        mouseout: (e) => e.target.setStyle(estiloEstado(feature)),
        click: () => {
            const nome = feature.properties?.name;
            const regiao = feature.properties?.regiao;
            layer.bindPopup(`<b>${nome}</b><br>Região: ${regiao}`).openPopup();
        }
    });
};

export default function Mapa() {
    const [popupAberto, setPopupAberto] = useState(false);
    const [featureSelecionada, setFeatureSelecionada] = useState(null);

    return (
        <>
            <MapContainer center={[-14.235, -51.9253]} zoom={4} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* GeoJSON dos estados */}
                <GeoJSON data={brasilEstados} style={estiloEstado} onEachFeature={interacoesEstado} />

                {/* Pontos culturais com ícones personalizados */}
                {patrimonioData.features.map((feature, idx) => {
                    if (!feature.geometry || feature.geometry.type !== "Point") return null;
                    const [lng, lat] = feature.geometry.coordinates;
                    const tipo = feature.properties?.tipo || "default";

                    return (
                        <Marker
                            key={idx}
                            position={[lat, lng]}
                            icon={getIcon(tipo)}
                            eventHandlers={{
                                click: () => {
                                    setFeatureSelecionada(feature);
                                    setPopupAberto(true);
                                }
                            }}
                        />
                    );
                })}
            </MapContainer>

            <PopupMapa
                aberto={popupAberto}
                titulo={featureSelecionada?.properties?.nome}
                descricao={`Tipo: ${featureSelecionada?.properties?.tipo || 'Indefinido'}`}
                textoBotao="Ver mais detalhes"
                linkDestino={`/detalhes/${featureSelecionada?.properties?.id}`}
                onFechar={() => setPopupAberto(false)}
            />
        </>
    );
}
