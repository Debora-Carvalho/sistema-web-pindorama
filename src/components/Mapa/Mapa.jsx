import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import brasilEstados from "../../json/brasil_geo.json"; // geojson com os estados brasileiros
import patrimonioData from "../../json/db-mock-pontos-mapa.json"; // geojson com os pontos culturais

// Ícones dos pontos culturais
const icons = {
    musica: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/727/727245.png", iconSize: [30, 30] }),
    culinaria: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png", iconSize: [30, 30] }),
    dança: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/263/263150.png", iconSize: [30, 30] }),
    indigena: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png", iconSize: [30, 30] }),
    afro: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/2098/2098565.png", iconSize: [30, 30] }),
    monumento: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/3179/3179069.png", iconSize: [30, 30] }),
    conto: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/197/197560.png", iconSize: [30, 30] }),
    default: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png", iconSize: [30, 30] }),
};

const getIcon = (tipo) => icons[tipo] || icons.default;

// Usa os estilos definidos no próprio GeoJSON
const estiloEstado = (feature) => ({
    color: feature.properties["stroke"] || "#333",
    weight: feature.properties["stroke-width"] || 1,
    fillColor: feature.properties["fill-color"] || "#ccc",
    fillOpacity: feature.properties["fill-opacity"] || 0.7,
});

// Interações ao passar o mouse
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
    return (
        <MapContainer
            center={[-14.235, -51.9253]}
            zoom={4}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* GeoJSON dos estados com estilo embutido */}
            <GeoJSON data={brasilEstados} style={estiloEstado} onEachFeature={interacoesEstado} />

            {/* Pontos culturais com ícones */}
            {patrimonioData.features.map((feature, idx) => {
                if (!feature.geometry || feature.geometry.type !== "Point") return null;
                const [lng, lat] = feature.geometry.coordinates;
                const tipo = feature.properties?.tipo || "default";

                return (
                    <Marker key={idx} position={[lat, lng]} icon={getIcon(tipo)}>
                        <Popup>
                            <strong>{feature.properties?.nome}</strong><br />Tipo: {tipo}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
