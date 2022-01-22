import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
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
import { Google, Menu, Favorite, Bookmark } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import SearchBar from '../searchbar';
import { SignInWithGoogle, Logout, auth } from '../../firebase/auth';
import { onSnapshot, doc } from 'firebase/firestore';
import { usersRef } from '../../firebase/user';
import { useEffect } from 'react';

const styles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
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
    const location = useLocation();
    const trigger = useScrollTrigger();
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [like, setLike] = useState(0);
    const [collect, setCollect] = useState(0);
    const [user] = useAuthState(auth);

    useEffect(async () => {
        if (user) {
            return onSnapshot(doc(usersRef, user.uid), (doc) => {
                if (doc.data().like) setLike(doc.data().like.length);
                if (doc.data().collect) setCollect(doc.data().collect.length);
            });
        }
    }, [user]);

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
                    {user && (
                        <>
                            <IconButton component={Link} to={'/favorite'} sx={styles.iconBtn}>
                                <Badge badgeContent={like} color="primary">
                                    <Favorite />
                                </Badge>
                            </IconButton>
                            <IconButton component={Link} to={'/collection'} sx={styles.iconBtn}>
                                <Badge badgeContent={collect} color="primary">
                                    <Bookmark />
                                </Badge>
                            </IconButton>
                        </>
                    )}
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
