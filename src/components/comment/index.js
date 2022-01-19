import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUser } from '../../firebase/user';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'var(--second-bg)',
        padding: '1.5rem',
        borderRadius: '1rem',
        margin: '1rem',
        [theme.breakpoints.up('lg')]: { width: '60%' },
    },
    avatar: {
        marginRight: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    comment: {},

    name: {
        fontSize: '1.8rem',
        [theme.breakpoints.up('lg')]: { fontSize: '2rem' },
    },
    content: {
        fontSize: '1.2rem',
        [theme.breakpoints.up('lg')]: { fontSize: '1.3rem' },
    },
}));
const Commment = ({ comment }) => {
    const classes = useStyles();
    const [user, setUser] = useState({});
    useEffect(async () => {
        const userCollection = await getUser(comment.userID);
        setUser(userCollection);
    }, []);
    return (
        <Box className={classes.container}>
            <Box class={classes.avatar}>
                <Avatar alt={user.userName} src={user.photoURL} />
            </Box>
            <Box className={classes.comment}>
                <Typography className={classes.name}>{user.userName}</Typography>
                <Typography className={classes.content}>{comment.content}</Typography>
            </Box>
        </Box>
    );
};

export default Commment;
