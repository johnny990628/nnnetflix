import React, { useState, useEffect } from 'react';
import { Box, IconButton, Popover, TextField, Avatar, Alert, Snackbar } from '@mui/material';
import { Favorite, ChatBubbleOutlined, Bookmark, Edit } from '@mui/icons-material';
import { motion } from 'framer-motion';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/auth';
import { setComment } from '../../firebase/movie';
import { setLikeList, setCollectList, isLike, isCollect } from '../../firebase/user';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '2rem',
        opacity: '.8',
        '&:hover': {
            opacity: '1',
            transform: 'scale(1.05)',
        },
    },
    popover: {
        minWidth: '20%',
        maxHeight: '60%',
        backdropFilter: 'blur(2px)',
        backgroundColor: 'var(--searchbar-color)',
        color: 'var(--text-color)',
        padding: '2rem',
    },
    input: {
        color: 'var(--text-color)',
    },
}));

const ButtonGroup = ({ movieID }) => {
    const [like, setLike] = useState(false);
    const [collect, setCollect] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const [value, setValue] = useState('');

    const [user] = useAuthState(auth);
    const classes = useStyles();

    useEffect(async () => {
        if (user) {
            if (await isLike(user.uid, movieID)) setLike(true);
            if (await isCollect(user.uid, movieID)) setCollect(true);
        }
    }, []);

    const handleClick = (type) => {
        if (type === 'like') {
            setLike(true);
            setLikeList(user.uid, movieID);
        } else if (type === 'collect') {
            setCollect(true);
            setCollectList(user.uid, movieID);
        }
    };

    const handleOpen = (e) => {
        if (user) {
            setAnchorEl(e.currentTarget);
            setOpen(true);
        } else {
            setAlert(true);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };
    const handleSubmit = () => {
        if (value) {
            setComment(user.uid, movieID, value);
            setOpen(false);
        }
    };

    return (
        <>
            <IconButton
                component={motion.div}
                exit="exit"
                initial="initial"
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                whileTap={{ scale: 0.75 }}
                onClick={() => handleClick('like')}
                disabled={like}
            >
                <Favorite
                    className={classes.icon}
                    sx={{ color: like ? 'var( --likebutton-color)' : 'var(--text-color)' }}
                />
            </IconButton>
            <IconButton
                component={motion.div}
                exit="exit"
                initial="initial"
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                whileTap={{ scale: 0.75 }}
                onClick={() => handleClick('collect')}
                disabled={collect}
            >
                <Bookmark
                    className={classes.icon}
                    sx={{ color: collect ? 'var(--collectbutton-color)' : 'var(--text-color)' }}
                />
            </IconButton>
            <IconButton onClick={handleOpen}>
                <ChatBubbleOutlined className={classes.icon} sx={{ color: 'var(--text-color)' }} />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                classes={{ paper: classes.popover }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {user && <Avatar alt={user.displayName} src={user.photoURL} sx={{ marginRight: '1rem' }} />}
                    <TextField
                        variant="standard"
                        fullWidth
                        label={user && user.displayName}
                        value={value}
                        InputProps={{
                            classes: {
                                input: classes.input,
                            },
                        }}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSubmit();
                        }}
                    />
                    <Box sx={{ marginLeft: '1rem' }}>
                        <IconButton className={classes.icon} sx={{ color: 'var(--text-color)' }} onClick={handleSubmit}>
                            <Edit />
                        </IconButton>
                    </Box>
                </Box>
            </Popover>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={alert}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    請先登入喔~
                </Alert>
            </Snackbar>
        </>
    );
};

export default ButtonGroup;
