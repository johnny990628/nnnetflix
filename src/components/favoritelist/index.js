import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InfiniteScroll from 'react-infinite-scroll-component';

import LoadingGif from '../../assets/loading.gif';
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
        [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(5,1fr)',
        },
    },
    title: {
        fontSize: '4rem',
    },
}));

const FavoriteList = ({ list, title }) => {
    const classes = useStyles();
    const [movie, setMovie] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    return (
        <Box>
            <Typography className={classes.title}>{title}</Typography>
            <Box className={classes.container}>
                {list.map((item) => (
                    <MovieCard key={item.id} item={item} />
                ))}
            </Box>
        </Box>
    );
};

export default FavoriteList;
