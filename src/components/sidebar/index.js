import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import sidebarItems from '../../assets/JsonData/sidebar.json';

const useStyles = makeStyles({
    sidebar: {
        height: '100vh',
        position: 'fixed',
        left: 100,
        top: 250,
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '26px',
        color: 'var(--text-color)',
        padding: '15px 25px',
        alignItems: 'center',
        transition: 'color 0.3s ease 0s',
        border: 'none',
        textTransform: 'capitalize',
        '&.active': {
            color: 'var(--main-color)',
        },
    },
});

const SidebarItem = (props) => {
    const classes = useStyles();
    const { active, title } = props;

    const isActive = active ? 'active' : '';
    return (
        <Button variant="text" className={`${classes.item} ${isActive}`}>
            {title}
        </Button>
    );
};

const Sidebar = () => {
    const classes = useStyles();
    const location = useLocation();
    const activeItem = sidebarItems.findIndex((item) => item.route === location.pathname);

    return (
        <div className={classes.sidebar}>
            {sidebarItems.map((item, index) => {
                return (
                    <Link to={item.route} key={index} style={{ textDecoration: 'none' }}>
                        <SidebarItem title={item.display_name} active={index === activeItem} />
                    </Link>
                );
            })}
        </div>
    );
};

export default Sidebar;
