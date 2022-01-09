import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Row from '../components/row';

import API, { IMG_URL } from '../api/api';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: '1.5rem 0',
        fontSize: '2.4rem',
        [theme.breakpoints.up('sm')]: { fontSize: '2.8rem' },
        [theme.breakpoints.up('md')]: { fontSize: '3rem' },
    },
}));

const Home = () => {
    const classes = useStyles();
    const [movie, setMovie] = useState([]);

    useEffect(async () => {
        const popularMovie = await API.getMovie('popular');
        const nowPlayingMovie = await API.getMovie('now_playing');
        const topRatedMovie = await API.getMovie('top_rated');
        setMovie([
            { title: '熱門電影', data: [...popularMovie] },
            { title: '熱映電影', data: [...nowPlayingMovie] },
            { title: '評分最高', data: [...topRatedMovie] },
        ]);
    }, []);

    return (
        <Box>
            {movie.map(({ title, data }) => {
                return (
                    <Box>
                        <Typography className={classes.title}>{title}</Typography>
                        <Row key={title} data={data} />
                    </Box>
                );
            })}
        </Box>
    );
};

export default Home;
