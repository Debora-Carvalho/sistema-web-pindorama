// Em: src/layouts/AdminLayout.jsx

import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin.jsx';
 // Crie um arquivo de estilo se precisar

export default function AdminLayout() {
    return (
        <div>
            <HeaderAdmin />
            <main>
                {/* As páginas (Artigos, Eventos, etc.) serão renderizadas aqui */}
                <Outlet />
            </main>
        </div>
    );
}