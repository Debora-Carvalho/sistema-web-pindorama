import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaginaTeste from "../pages/PaginaTeste/PaginaTeste.jsx";
import PaginaInicial from "../pages/Usuario/PaginaInicial/PaginaInicial.jsx";
import PaginaCriarArtigo from "../pages/Administrador/PaginaCriarArtigo/CriarArtigo.jsx";
import PaginaLogin from "../pages/Administrador/PaginaLogin/PaginaLogin.jsx";
import PaginaInicialAdmin from "../pages/Administrador/PaginaInicialAdmin/PaginaInicialAdmin.jsx";
import AdminLayout from '../layouts/AdminLayout.jsx';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PaginaTeste />} />
				<Route path="/inicio" element={<PaginaInicial />} />
				<Route path="/login" element={<PaginaLogin />} />

				<Route element={<AdminLayout />}>
					<Route path="/admin/inicio" element={<PaginaInicialAdmin />} />
					<Route path="/admin/criar-artigo" element={<PaginaCriarArtigo />} />
					{/* Lembrar de colocar aqui as outras rotas de admin */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;