import { Box, Grid, Typography, Chip, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StarOutline } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import API, { IMG_URL } from '../api/api';

const useStyles = makeStyles((theme) => ({
    container: { padding: '2rem' },
    img: {
        width: '100%',
        borderRadius: '2rem',
    },
    title: {
        fontSize: '4rem',
    },
    tags: {
        color: 'var(--text-color)',
        marginRight: '1rem',
        padding: '.5rem',
        fontSize: '1rem',
    },
    text: { fontSize: '1.5rem' },
    head: { fontSize: '3rem', marginTop: '1rem' },
}));

const MovieInfo = () => {
    const classes = useStyles();
    const { movieID } = useParams();
    const [movie, setMovie] = useState({});
    useEffect(async () => {
        const result = await API.getMovieInfo(movieID);
        setMovie(result);
    }, []);
    return (
        <Grid container spacing={4} className={classes.container}>
            <Grid item xs={4}>
                <Box>
                    <img
                        src={`${IMG_URL}${movie.poster_path || movie.backdrop_path}`}
                        alt={movie.title}
                        className={classes.img}
                    />
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography className={classes.title}>{movie.title}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <StarOutline sx={{ marginRight: '.5rem', color: '#F0B734' }} />
                                <Typography className={classes.text}>{movie.vote_average}</Typography>
                            </Box>
                        </Box>
                        {movie.genres &&
                            movie.genres.map((genre) => {
                                return (
                                    <Chip
                                        label={<Typography className={classes.text}>{genre.name}</Typography>}
                                        variant="outlined"
                                        className={classes.tags}
                                    />
                                );
                            })}

                        <Typography className={classes.head}>電影概要</Typography>
                        <Typography className={classes.text}>{movie.overview || '無相關電影概要'}</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default MovieInfo;
