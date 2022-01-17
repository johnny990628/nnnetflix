import { Box, Typography } from '@mui/material';
import React from 'react';

import { makeStyles } from '@mui/styles';

import MovieList from '../components/movielist';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: '1rem 0',
        fontSize: '2.4rem',
        [theme.breakpoints.up('sm')]: { fontSize: '2.8rem' },
        [theme.breakpoints.up('md')]: { fontSize: '3rem' },
    },
}));

const TopRated = () => {
    const classes = useStyles();
    return (
        <Box>
            <Typography className={classes.title}>評分最高</Typography>
            <MovieList type={'top_rated'} />
        </Box>
    );
};

export default TopRated;
