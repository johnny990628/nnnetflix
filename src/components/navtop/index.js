import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import {
    IconButton,
    Avatar,
    Badge,
    AppBar,
    Toolbar,
    Snackbar,
    Alert,
    useMediaQuery,
    Box,
    useScrollTrigger,
} from '@mui/material';
import { Google, Email, Notifications, Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import SearchBar from '../searchbar';
import { SignInWithGoogle, Logout } from '../../firebase';

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
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [user] = useAuthState(auth);
    const handleSignin = () => {
        SignInWithGoogle().then((user) => {
            if (user) {
                setIsLogin(true);
                setOpen(true);
            }
        });
    };
    const handleLogout = () => {
        Logout();
        setIsLogin(false);
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <AppBar
            elevation={0}
            position="fixed"
            sx={
                trigger
                    ? {
                          backdropFilter: 'blur(2px)',
                          backgroundColor: 'var(--navbar-color)',
                      }
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
                    {user ? (
                        <IconButton sx={styles.iconBtn} onClick={handleLogout}>
                            <Avatar alt={user.displayName} src={user.photoURL} />
                        </IconButton>
                    ) : (
                        <IconButton sx={styles.iconBtn} onClick={handleSignin}>
                            <Google />
                        </IconButton>
                    )}

                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {isLogin ? '登入成功' : '登出成功'}
                        </Alert>
                    </Snackbar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navtop;
