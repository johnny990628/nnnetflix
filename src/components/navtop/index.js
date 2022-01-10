import React, { useState } from 'react';

import {
    IconButton,
    Avatar,
    Badge,
    AppBar,
    Toolbar,
    InputBase,
    Typography,
    useMediaQuery,
    Box,
    useScrollTrigger,
} from '@mui/material';
import { Search, Email, Notifications, Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import SearchBar from '../searchbar';

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

    icons: {
        display: 'flex',
        alignItems: 'center',
    },
    iconBtn: { color: 'var(--text-color)', marginRight: '10px' },

    searchButton: { marginRight: '20px' },
};

const Navtop = ({ openDrawer }) => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('md'));
    const trigger = useScrollTrigger();

    return (
        <AppBar
            elevation={0}
            position="fixed"
            sx={
                trigger
                    ? { backdropFilter: 'blur(5px)', backgroundColor: 'var(--navbar-color)' }
                    : { backgroundColor: 'transparent' }
            }
        >
            <Toolbar sx={styles.toolbar}>
                <Box sx={{ display: 'flex' }}>
                    {isPhone ? (
                        <IconButton sx={styles.iconBtn} onClick={openDrawer}>
                            <Menu />
                        </IconButton>
                    ) : (
                        <Box />
                    )}

                    {/* <Typography variant="h5">NNNETFLIX</Typography> */}
                </Box>
                {!isPhone && <SearchBar type={'bar'} />}
                {/* <Tabs value={value} textColor="inherit" onChange={handleChange}>
                    <Tab label="Main" component={Link} to="/" />
                    <Tab label="Popular" component={Link} to="/popular" />
                </Tabs> */}

                <Box sx={styles.icons}>
                    {isPhone && <SearchBar type={'icon'} />}
                    <IconButton sx={styles.iconBtn}>
                        <Badge badgeContent={4} color="primary">
                            <Email />
                        </Badge>
                    </IconButton>
                    <IconButton sx={styles.iconBtn}>
                        <Badge badgeContent={6} color="primary">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <IconButton sx={styles.iconBtn}>
                        <Avatar color="primary">XUN</Avatar>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navtop;
