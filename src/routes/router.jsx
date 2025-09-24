import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaginaTeste from "../pages/PaginaTeste/PaginaTeste.jsx";
import PaginaInicial from "../pages/Usuario/PaginaInicial/PaginaInicial.jsx";
import PaginaCriarArtigo from "../pages/Administrador/PaginaCriarArtigo/CriarArtigo.jsx";
import PaginaLogin from "../pages/Administrador/PaginaLogin/PaginaLogin.jsx";
import PaginaInicialAdmin from "../pages/Administrador/PaginaInicialAdmin/PaginaInicialAdmin.jsx";
import AdminLayout from '../layouts/AdminLayout.jsx';
import PaginaVisualizarArtigos from "../pages/Administrador/PaginaVisualizarArtigos/PaginaVisualizarArtigos.jsx";
import PaginaVisualizarEventos from "../pages/Administrador/PaginaVisualizarArtigos/PaginaVisualizarEventos.jsx";
import PaginaCriarEvento from "../pages/Administrador/PaginaCriarEvento/CriarEvento.jsx";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PaginaTeste />} />
				<Route path="/inicio" element={<PaginaInicial />} />
				<Route path="/login" element={<PaginaLogin />} />

				<Route element={<AdminLayout />}>
					<Route path="/adm/inicio" element={<PaginaInicialAdmin />} />
					<Route path="/adm/criar-artigo" element={<PaginaCriarArtigo />} />
					<Route path="/adm/criar-evento" element={<PaginaCriarEvento />} />
					<Route path="/adm/visualizar-artigos" element={<PaginaVisualizarArtigos />} />
					<Route path="/adm/visualizar-eventos" element={<PaginaVisualizarEventos />} />
					{/* Lembrar de colocar aqui todas as rotas de admin, pelo menos as que vão usar a navbar */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;