import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import {
    Home,
    HomeOutlined,
    LocalFireDepartmentOutlined,
    ManageSearch,
    FormatListBulleted,
    Settings,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import sidebarItems from '../../assets/JsonData/sidebar.json';
import Logo from '../../assets/logo.png';

const useStyles = makeStyles((theme) => ({
    logo: { position: 'fixed', top: '1rem', left: '1rem' },
    item: {
        color: 'var(--text-color)',
        '&.active': {
            color: 'var(--main-color)',
        },
    },
    drawer: {
        width: 'var(--drawer-width)',
        backgroundColor: 'transparent',
        borderRightColor: 'var(--main-color)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    mobileDrawer: {
        backgroundColor: 'var(--main-bg)',
        justifyContent: 'center',
    },
    text: {
        textTransform: 'capitalize',
        fontSize: '1rem',
    },
    link: {
        textDecoration: 'none',
        color: 'var(--text-color)',
        width: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1rem',
    },
}));

const LeftDrawer = ({ isOpen, isComputer, setDrawer }) => {
    const classes = useStyles();
    const location = useLocation();
    const activeItem = sidebarItems.findIndex((item) => item.route === location.pathname);
    return (
        <Drawer
            variant={isComputer && 'permanent'}
            className={isComputer && classes.drawer}
            classes={{ paper: isComputer ? classes.drawer : classes.mobileDrawer }}
            open={isOpen}
            onClose={() => setDrawer(false)}
        >
            {isComputer && (
                <Link to={'/'}>
                    <img src={Logo} width={200} className={classes.logo} />
                </Link>
            )}
            <List>
                {sidebarItems.map((item, index) => {
                    return (
                        <ListItem button disableRipple key={item.display_name}>
                            <Link to={item.route} className={classes.link}>
                                {item.name === 'home' && (
                                    <HomeOutlined className={`${classes.item} ${index === activeItem && 'active'}`} />
                                )}
                                {item.name === 'popular' && (
                                    <LocalFireDepartmentOutlined
                                        className={`${classes.item} ${index === activeItem && 'active'}`}
                                    />
                                )}
                                {item.name === 'discover' && (
                                    <ManageSearch className={`${classes.item} ${index === activeItem && 'active'}`} />
                                )}
                                {item.name === 'categories' && (
                                    <FormatListBulleted
                                        className={`${classes.item} ${index === activeItem && 'active'}`}
                                    />
                                )}
                                {item.name === 'setting' && (
                                    <Settings className={`${classes.item} ${index === activeItem && 'active'}`} />
                                )}
                                <ListItemText
                                    primary={item.display_name}
                                    className={`${classes.item} ${index === activeItem && 'active'}`}
                                    classes={{ primary: classes.text }}
                                    onClick={() => setDrawer(false)}
                                />
                            </Link>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
};

export default LeftDrawer;
