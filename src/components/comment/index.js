import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '60%',
        display: 'flex',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'var(--second-bg)',
        padding: '1.5rem',
        borderRadius: '1rem',
        margin: '1rem',
    },
    avatar: {
        marginRight: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    comment: {},

    name: {
        fontSize: '1.5rem',
    },
    content: {
        fontSize: '1rem',
    },
}));
const Commment = ({ name, comment }) => {
    const classes = useStyles();
    const [user] = useAuthState(auth);
    return (
        <Box className={classes.container}>
            <Box class={classes.avatar}>
                <Avatar alt={user.displayName} src={user.photoURL} />
            </Box>
            <Box className={classes.comment}>
                <Typography className={classes.name}>{user.displayName}</Typography>
                <Typography className={classes.content}>
                    巴斯特和他的藝人們巴斯特和他的藝人們巴斯特和他的藝人們
                </Typography>
            </Box>
        </Box>
    );
};

export default Commment;