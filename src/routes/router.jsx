import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

// ROTAS USUARIO
import PaginaTeste from "../pages/PaginaTeste/PaginaTeste.jsx";
import PaginaInicial from "../pages/Usuario/PaginaInicial/PaginaInicial.jsx";
import PaginaVisualizarArtigos from "../pages/Usuario/PaginaVisualizarArtigos/PaginaVisualizarArtigos.jsx";
import PaginaVisualizarEventos from "../pages/Usuario/PaginaVisualizarEventos/PaginaVisualizarEventos.jsx";
import PaginaVisualizarGaleria from "../pages/Usuario/PaginaVisualizarGaleria/PaginaVisualizarGaleria.jsx";

// ROTAS ADMINISTRADOR
import AdminLayout from '../layouts/AdminLayout.jsx';
import PaginaLogin from "../pages/Administrador/PaginaLogin/PaginaLogin.jsx";
import PaginaInicialAdmin from "../pages/Administrador/PaginaInicialAdmin/PaginaInicialAdmin.jsx";
import PaginaCriarArtigo from "../pages/Administrador/PaginaCriarArtigo/CriarArtigo.jsx";
import PaginaCriarEvento from "../pages/Administrador/PaginaCriarEvento/CriarEvento.jsx"
import PaginaVisualizarArtigosAdmin from "../pages/Administrador/PaginaVisualizarArtigos/PaginaVisualizarArtigos.jsx";
import PaginaVisualizarEventosAdmin from "../pages/Administrador/PaginaVisualizarArtigos/PaginaVisualizarEventos.jsx";

const AnimatedRoutes = () => {
	const location = useLocation();

	return (

		<AnimatePresence mode="wait">
			<Routes>
				{/* ROTAS USUARIO */}
				<Route path="/" element={<PaginaTeste />} />
				<Route path="/inicio" element={<PaginaInicial />} />
				<Route path="/login" element={<PaginaLogin />} />
				<Route path="/artigos" element={<PaginaVisualizarArtigos />} />
				<Route path="/eventos" element={<PaginaVisualizarEventos />} />
				<Route path="/galeria" element={<PaginaVisualizarGaleria />} />

				{/* ROTAS ADMINISTRADOR */}
				<Route element={<AdminLayout />}>
					<Route path="/adm/inicio" element={<PaginaInicialAdmin />} />
					<Route path="/adm/criar-artigo" element={<PaginaCriarArtigo />} />
					<Route path="/adm/criar-evento" element={<PaginaCriarEvento />} />
					<Route path="/adm/artigos" element={<PaginaVisualizarArtigosAdmin />} />
					<Route path="/adm/eventos" element={<PaginaVisualizarEventosAdmin />} />
				</Route>
			</Routes>
		</AnimatePresence>

	);
}

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<AnimatedRoutes />
		</BrowserRouter>
	);
}

export default AppRoutes;