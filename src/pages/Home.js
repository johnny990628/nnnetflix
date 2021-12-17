import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import API, { IMG_URL } from '../api/api';

const Home = () => {
    const [movie, setMovie] = useState([]);
    useEffect(async () => {
        const movies = await API.getPopularMovies();
        setMovie(movies);
    }, []);
    return (
        <Box>
            <Box>上映中</Box>
            <Box>
                {movie.map((movie) => {
                    return <img src={IMG_URL + movie.poster_path} />;
                })}
            </Box>
        </Box>
    );
};

export default Home;
