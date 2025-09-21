import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaginaTeste from "../pages/PaginaTeste/PaginaTeste.jsx";
import PaginaInicial from "../pages/Usuario/PaginaInicial/PaginaInicial.jsx";
import PaginaCriarArtigo from "../pages/Administrador/PaginaCriarArtigo/CriarArtigo.jsx";
import PaginaLogin from "../pages/Administrador/PaginaLogin/PaginaLogin.jsx";
import PaginaCriarEvento from "../pages/Administrador/PaginaCriarEvento/CriarEvento.jsx";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PaginaTeste />} />
				<Route path="/inicio" element={<PaginaInicial />} />
				<Route path="/admin/criar-artigo" element={<PaginaCriarArtigo />} />
				<Route path="/login" element={<PaginaLogin />} />
				<Route path='/admin/criar-evento' element={<PaginaCriarEvento />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;