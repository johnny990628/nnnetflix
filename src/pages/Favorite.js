import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { auth } from '../firebase/auth';
import { getCurrentLikeList, getCurrentCollectList } from '../firebase/user';

import MovieCard from '../components/moviecard';
import API from '../api/api';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2,1fr)',
        gap: '1rem',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(3,1fr)',
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(4,1fr)',
        },
        [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(5,1fr)',
        },
    },
    title: {
        margin: '1rem 0',
        fontSize: '2.4rem',
        [theme.breakpoints.up('sm')]: { fontSize: '2.8rem' },
        [theme.breakpoints.up('md')]: { fontSize: '3rem' },
    },
}));

const Favorite = () => {
    const classes = useStyles();
    const [user] = useAuthState(auth);
    const [list, setList] = useState([]);
    const location = useLocation();

    useEffect(async () => {
        if (user) {
            const movieList =
                location.pathname === '/favorite'
                    ? await getCurrentLikeList(user.uid)
                    : await getCurrentCollectList(user.uid);

            setList(await Promise.all(movieList.map(async (movie) => await API.getMovieInfo(movie))));
        }
    }, [location, user]);

    return (
        <Box>
            <Typography className={classes.title}>
                {location.pathname === '/favorite' ? '我的最愛' : '我的片單'}
            </Typography>
            <Box className={classes.container}>
                {list.map((item) => (
                    <MovieCard key={item.id} item={item} />
                ))}
            </Box>
        </Box>
    );
};

export default Favorite;
