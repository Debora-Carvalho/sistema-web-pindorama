import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin.jsx';

export default function AdminLayout() {
    return (
        <div>
            <HeaderAdmin />
            <main>
                <Outlet />
            </main>
        </div>
    );
}