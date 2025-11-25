import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.scss';

import PoliticasDePrivacidade from '../../components/Telas Estaticas/PoliticasDePrivacidade/PoliticasDePrivacidade.jsx';
import TermosDeUso from '../../components/Telas Estaticas/TermosDeUso/TermosDeUso.jsx';

import { HiOutlineBars3 } from "react-icons/hi2"
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { FaFileAlt, FaCalendarCheck, FaMap, FaHeart } from 'react-icons/fa';
import { FaImage, FaBuilding, FaCircleQuestion } from "react-icons/fa6";
import { MdInfo, MdOutlineSecurity } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import Logotipo from "../Logotipo/Logotipo";

const Navbar = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [mostrarPoliticas, setMostrarPoliticas] = useState(false);
    const [mostrarTermos, setMostrarTermos] = useState(false);

    const menuOptions = [
        {
            text: "Início",
            icon: <AiFillHome />,
            navigate: "/inicio",
        },
        {
            text: "Artigos",
            icon: <FaFileAlt />,
            navigate: "/artigos",
        },
        {
            text: "Eventos",
            icon: <FaCalendarCheck />,
            navigate: "/eventos",
        },
        {
            text: "Galeria",
            icon: <FaImage />,
            navigate: "/galeria",
        },
        {
            text: "Mapa",
            icon: <FaMap />,
            navigate: "/mapa",
        },
        {
            text: "Organizações",
            icon: <FaBuilding />,
            navigate: "/organizacoes",
        },
        {
            text: "Sobre a autora",
            icon: <FaHeart />,
            navigate: "/sobre",
        },
        {
            text: "FAQ - Ajuda",
            icon: <FaCircleQuestion />,
            navigate: "/ajuda",
        },
        {
            text: "Políticas de privacidade",
            icon: <MdOutlineSecurity />,
            onClick: () => setMostrarPoliticas(true),
        },
        {
            text: "Termos e condições",
            icon: <MdInfo />,
            onClick: () => setMostrarTermos(true),
        },
    ];

    return (
        <nav>
            <div className={styles.navbarContainer}>
                <HiOutlineBars3
                    className={styles.navbarContainerIcon}
                    onClick={() => setOpenMenu(true)}
                />
            </div>

            <Drawer open={openMenu} onClose={(() => setOpenMenu(false))} anchor="right"
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: '20px 0 0 20px',
                            boxShadow: 3,
                        }
                    }
                }}
            >
                <Box
                    sx={{
                        width: 250,
                        height: '100%',
                        borderRadius: '20px 0 0px 20px',
                    }}
                    role="presentation"
                    className={styles.navbar}
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        <div style={{ padding: "10% 0" }}>
                            <Logotipo tipo="user" />
                        </div>

                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding className={styles.content}>
                                {item.onClick ? (
                                    <ListItemButton
                                        className={styles.navbarItem}
                                        onClick={() => {
                                            item.onClick();
                                            setOpenMenu(false);
                                        }}
                                    >
                                        <ListItemIcon className={styles.navbarIcon}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} className={styles.navbarText} />
                                    </ListItemButton>
                                ) : (
                                    <NavLink
                                        to={item.navigate}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${styles.navbarItem} ${styles.active}`
                                                : styles.navbarItem
                                        }
                                    >
                                        <ListItemButton className={styles.navbarItem}>
                                            <ListItemIcon className={styles.navbarIcon}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.text} className={styles.navbarText} />
                                        </ListItemButton>
                                    </NavLink>
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {mostrarPoliticas && (
                <PoliticasDePrivacidade onClose={() => setMostrarPoliticas(false)} />
            )}
            {mostrarTermos && (
                <TermosDeUso onClose={() => setMostrarTermos(false)} />
            )}
        </nav>
    );
};

export default Navbar;