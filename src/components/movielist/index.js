import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InfiniteScroll from 'react-infinite-scroll-component';

import API, { IMG_URL } from '../../api/api';

import MovieCard from '../moviecard';

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
    },
    title: {
        margin: theme.spacing(3),
        fontSize: '1.5rem',
        [theme.breakpoints.up('sm')]: { fontSize: '2rem' },
        [theme.breakpoints.up('md')]: { fontSize: '2.5rem' },
    },
}));

const MovieList = ({ type }) => {
    const classes = useStyles();
    const [movie, setMovie] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const movies = await API.getMovie(type, page);
            setMovie([...movie, ...movies]);
            setPage(page * 1 + 1);
        } catch (e) {
            console.log(e);
            setHasMore(false);
        }
    };

    return (
        <Box>
            <Typography className={classes.title}>熱門電影</Typography>
            <InfiniteScroll
                className={classes.container}
                dataLength={movie.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<Box sx={{ fontSize: '2rem' }}>Loading...</Box>}
            >
                {movie.map((item) => {
                    return <MovieCard key={item.id} item={item} />;
                })}
            </InfiniteScroll>
        </Box>
    );
};

export default MovieList;
