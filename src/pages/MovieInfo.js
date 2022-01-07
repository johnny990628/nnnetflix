import { Box, Grid, Typography, Chip, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalVideo from 'react-modal-video';

import { StarOutline } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useParams, useLocation } from 'react-router-dom';
import API, { IMG_URL } from '../api/api';

import MovieCard from '../components/moviecard';

const useStyles = makeStyles((theme) => ({
    container: { padding: '2rem' },
    img: {
        width: '100%',
        borderRadius: '2rem',
    },
    title: {
        fontSize: '4rem',
        width: '60%',
        lineHeight: '4rem',
    },
    tags: {
        color: 'var(--text-color)',
        margin: '1rem .5rem 1rem 0',
        padding: '.5rem',
        fontSize: '.6rem',
    },
    text: { fontSize: '1.5rem' },
    head: { fontSize: '3rem', marginTop: '1rem' },
}));

const MovieInfo = () => {
    const location = useLocation();
    const classes = useStyles();
    const { movieID } = useParams();
    const [movie, setMovie] = useState({});
    const [video, setVideo] = useState({});
    const [isOpen, setOpen] = useState(false);
    useEffect(async () => {
        const detail = await API.getMovieInfo(movieID);
        let { results: tailer } = await API.getVideo(movieID);
        console.log(tailer);
        setMovie(detail);
        setVideo(tailer[0]);
    }, [location]);

    return (
        <Grid container spacing={4} className={classes.container}>
            <Grid item xs={4}>
                <Box>
                    {/* <img
                        src={`${IMG_URL}${movie.poster_path || movie.backdrop_path}`}
                        alt={movie.title}
                        className={classes.img}
                    /> */}
                    <Box onClick={() => setOpen(true)}>
                        <MovieCard item={movie} />
                    </Box>
                    {video && (
                        <ModalVideo
                            channel="youtube"
                            autoplay
                            isOpen={isOpen}
                            videoId={video.key}
                            onClose={() => setOpen(false)}
                        />
                    )}
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
                                        key={genre.id}
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
