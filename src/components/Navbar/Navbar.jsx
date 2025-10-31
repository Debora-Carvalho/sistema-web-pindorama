import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.scss';

import LogoPindorama from "../../assets/images/pindorama_logo5.png";

import { HiOutlineBars3 } from "react-icons/hi2"
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { FaFileAlt, FaCalendarCheck, FaMap, FaHeart } from 'react-icons/fa';
import { FaImage, FaBuilding } from "react-icons/fa6";
import { MdInfo, MdOutlineSecurity } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import Logotipo from "../Logotipo/Logotipo";

const Navbar = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
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
            text: "Políticas de privacidade",
            icon: <MdOutlineSecurity />,
            navigate: "/sobre",
        },
        {
            text: "Termos e condições",
            icon: <MdInfo />,
            navigate: "/sobre",
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
                        <div style={{padding: "10% 0"}}>
                            <Logotipo tipo="user" />
                        </div>

                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding className={styles.content}>
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
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    );
};

export default Navbar;