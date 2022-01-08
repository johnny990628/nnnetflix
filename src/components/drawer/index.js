import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import sidebarItems from '../../assets/JsonData/sidebar.json';

const useStyles = makeStyles((theme) => ({
    item: {
        fontSize: '26px',
        color: 'var(--text-color)',
        '&.active': {
            color: 'var(--main-color)',
        },
    },
    drawer: {
        width: 'calc(var(--drawer-width) - 2rem)',
        backgroundColor: 'transparent',
        borderRightColor: 'var(--main-color)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mobileDrawer: {
        backgroundColor: 'var(--main-bg)',
        justifyContent: 'center',
    },
    text: {
        textTransform: 'capitalize',
        fontSize: '1.3rem',
        margin: '0 2rem',
    },
    link: {
        textDecoration: 'none',
        color: 'var(--text-color)',
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
            <List>
                {sidebarItems.map((item, index) => {
                    return (
                        <ListItem button disableRipple key={item.display_name}>
                            <Link to={item.route} className={classes.link}>
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
