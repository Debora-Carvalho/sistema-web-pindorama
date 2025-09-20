import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaginaTeste from "../pages/PaginaTeste/PaginaTeste.jsx";
import PaginaInicial from "../pages/Usuario/PaginaInicial/PaginaInicial.jsx";
import PaginaCriarArtigo from "../pages/Administrador/PaginaCriarArtigo/CriarArtigo.jsx";
import PaginaLogin from "../pages/Administrador/PaginaLogin/PaginaLogin.jsx";
import PaginaVisualizarArtigos from "../pages/Administrador/PaginaVisualizarArtigos/PaginaVisualizarArtigos.jsx";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PaginaTeste />} />
				<Route path="/inicio" element={<PaginaInicial />} />
				<Route path="/criar-artigo" element={<PaginaCriarArtigo />} />
				<Route path="/login" element={<PaginaLogin />} />
				<Route path="/visualizar-artigos" element={<PaginaVisualizarArtigos />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;