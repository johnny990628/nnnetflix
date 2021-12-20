import React, { useState } from 'react';

import { Tabs, Tab, Avatar, Badge, AppBar, Toolbar, InputBase, Typography, useMediaQuery, Box } from '@mui/material';
import { Search, Email, Notifications } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const styles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    searchbar: {
        display: 'flex',
        alignItems: 'center',
        width: '20%',
        backgroundColor: 'var(--searchbar-color)',
        '&:hover': {
            backgroundColor: 'var(--searchbar-color-hover)',
        },
        borderRadius: '5px',
        padding: '5px',
    },
    input: {
        color: 'var(--text-color)',
        flexGrow: 1,
    },
    badge: {
        marginRight: '20px',
    },
    icons: {
        display: 'flex',
        alignItems: 'center',
    },
    searchButton: { marginRight: '20px' },
};

const Navtop = () => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBar elevation={0} position="fixed" sx={{ backgroundColor: 'var(--main-bg)' }}>
            <Toolbar sx={styles.toolbar}>
                <Typography variant="h6">NNNETFLIX</Typography>
                {!isPhone && (
                    <Box sx={styles.searchbar}>
                        <Search sx={{ color: 'var(--text-color)', margin: '0 10px' }} />
                        <InputBase placeholder="Search..." sx={styles.input} />
                    </Box>
                )}

                {/* <Tabs value={value} textColor="inherit" onChange={handleChange}>
                    <Tab label="Main" component={Link} to="/" />
                    <Tab label="Popular" component={Link} to="/popular" />
                </Tabs> */}

                <Box sx={styles.icons}>
                    {isPhone && (
                        <Search sx={{ color: 'var(--text-color)', margin: '0 10px' }} sx={styles.searchButton} />
                    )}

                    <Badge badgeContent={4} color="primary" sx={styles.badge}>
                        <Email />
                    </Badge>
                    <Badge badgeContent={6} color="primary" sx={styles.badge}>
                        <Notifications />
                    </Badge>
                    <Avatar color="primary">XUN</Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navtop;
