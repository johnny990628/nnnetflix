import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import MovieList from '../components/movielist';

const useStyles = makeStyles((theme) => ({}));

const Discover = () => {
    const classes = useStyles();
    const location = useLocation();
    const params = new URLSearchParams(location.search).get('query');
    return (
        <Box sx={{ padding: '1rem' }}>
            <Typography sx={{ fontSize: '4rem' }}>搜尋結果:{params}</Typography>
            <MovieList type={'now_playing'} />
        </Box>
    );
};

export default Discover;
