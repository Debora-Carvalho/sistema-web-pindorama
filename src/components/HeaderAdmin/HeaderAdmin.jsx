import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import useWindowSize from './useWindowSize';
import styles from './HeaderAdmin.module.scss';

// Importando ícones de exemplo da biblioteca react-icons
import { FaFileAlt, FaCalendarCheck, FaCog, FaSignOutAlt } from 'react-icons/fa';

import { useAuth } from '../../contexts/AuthContext';

// Dados dos itens de navegação para facilitar a renderização
const navItems = [
    { id: 1, label: 'Artigos', icon: <FaFileAlt />, path: '/adm/visualizar-artigos' },
    { id: 2, label: 'Eventos', icon: <FaCalendarCheck />, path: '/adm/visualizar-eventos' },
    { id: 3, label: 'Configurações', icon: <FaCog /> },
];

const logoutItem = { id: 4, label: 'Logout', icon: <FaSignOutAlt /> };



export default function HeaderAdmin() {
    const location = useLocation();
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const isMobile = width <= 760;
    const isPaginaInicial = location.pathname === "/adm/inicio"
    const isCollapsed = isMobile || !isPaginaInicial;
    const { logout } = useAuth();

    // Variantes de animação para o contêiner principal
    const containerVariants = {
        expanded: { width: 'auto', padding: '8px 20px', borderRadius: '50px' },
        collapsed: { width: 'auto', padding: '8px', borderRadius: '50px' },
    };

    // Variantes para o botão (para controlar o arredondamento)
    const buttonVariants = {
        expanded: { borderRadius: '30px' },
        collapsed: { borderRadius: '80%' },
    };

    const handleLogout = () => {
        logout();
        navigate('/inicio');
    };

    return (
        <>
            <motion.nav
                className={styles.navbar}
                variants={containerVariants}
                animate={isCollapsed ? 'collapsed' : 'expanded'}
                transition={{ duration: 0.5, type: 'spring', damping: 15 }}
            >
                <div className={`${styles.mainNavGroup} ${isCollapsed ? styles.collapsed : ''}`}>
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <motion.li key={item.id} layout>
                                <Link to={item.path} className={styles.navLink}>
                                    <motion.button
                                        className={`${styles.navButton} ${isCollapsed ? styles.collapsed : ''}`}
                                        variants={buttonVariants}
                                        animate={isCollapsed ? 'collapsed' : 'expanded'}
                                        transition={{ duration: 0.3, type: 'spring', damping: 15 }}
                                    >
                                        <span className={styles.icon}>{item.icon}</span>
                                        <AnimatePresence>
                                            {!isCollapsed && (
                                                <motion.span
                                                    className={styles.label}
                                                    initial={{ opacity: 0, x: -2 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -2 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/*botão de logout*/}
                <motion.div className={styles.logoutNavGroup} layout>
                    <motion.button
                        onClick={handleLogout}
                        className={`${styles.navButton} ${styles.logoutButton}`}
                        variants={buttonVariants}
                        animate={isCollapsed ? 'collapsed' : 'expanded'}
                        transition={{ duration: 0.3, type: 'spring', damping: 15 }}
                    >
                        <span className={styles.icon}>{logoutItem.icon}</span>
                        <AnimatePresence>
                            {!isCollapsed && (
                                <motion.span
                                    className={styles.label}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {logoutItem.label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </motion.div>

            </motion.nav>
        </>
    );
}