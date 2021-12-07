import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
        color: 'var(--text-color)',
        padding: '15px 25px',
        alignItems: 'center',
        transition: 'color 0.3s ease 0s',
        border: 'none',
        textTransform: 'capitalize',
    },
});

const Sidebar = () => {
    const classes = useStyles();
    const location = useLocation();
    const [view, setView] = React.useState('main');

    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    return (
        <ToggleButtonGroup
            className={classes.sidebar}
            color="primary"
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
        >
            {sidebarItems.map((item, index) => {
                return (
                    <ToggleButton component={Link} to={item.route} className={classes.item} value={item.display_name}>
                        {item.display_name}
                    </ToggleButton>
                );
            })}
        </ToggleButtonGroup>
    );
};

export default Sidebar;
