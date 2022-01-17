import { Box, Grid, Typography, Chip, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalVideo from 'react-modal-video';

import { StarOutline, Favorite, ChatBubbleOutlined, Bookmark } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useParams, useLocation } from 'react-router-dom';
import API, { IMG_URL_BG } from '../api/api';

import MovieCard from '../components/moviecard';
import Row from '../components/row';
import CommentList from '../components/commentlist';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('sm')]: { padding: '2rem' },
        [theme.breakpoints.up('md')]: { padding: '3rem' },
    },
    img: {
        width: '100%',
        borderRadius: '2rem',
    },
    title: {
        fontSize: '2.5rem',
        lineHeight: '4rem',
        [theme.breakpoints.up('md')]: { fontSize: '3rem' },
        [theme.breakpoints.up('lg')]: { fontSize: '4rem' },
    },
    tags: {
        color: 'var(--text-color)',
        margin: '1rem .5rem 1rem 0',
        padding: '.2rem',
        fontSize: '.6rem',
        [theme.breakpoints.up('md')]: { padding: '.5rem' },
    },
    text: {
        fontSize: '1.2rem',
        padding: '1rem',
        [theme.breakpoints.up('md')]: { fontSize: '1.5rem' },
    },
    head: {
        fontSize: '2.5rem',
        marginTop: '1rem',
        [theme.breakpoints.up('md')]: { fontSize: '3rem' },
    },
    icon: {
        fontSize: '2rem',
        color: 'var(--text-color)',
        opacity: '.8',
        '&:hover': {
            opacity: '1',
        },
    },
    iconlist: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '1rem',
    },
}));

const MovieInfo = () => {
    const location = useLocation();
    const classes = useStyles();
    const { movieID } = useParams();
    const [movie, setMovie] = useState({});
    const [video, setVideo] = useState({});
    const [backgroundImg, setBackgroundImg] = useState({});
    const [actor, setActor] = useState([]);
    const [isOpen, setOpen] = useState(false);
    useEffect(async () => {
        const imgResponse = await API.getImage(movieID);
        const { backdrops } = imgResponse;
        const movieResponse = await API.getMovieInfo(movieID);
        const actorResponse = await API.getActor(movieID);
        const { results: videoResponse } = await API.getVideo(movieID);

        setBackgroundImg(backdrops.find((i) => i.height * 1 >= 1080));
        setMovie(movieResponse);
        setActor(actorResponse);
        setVideo(videoResponse.find((v) => v.type === 'Teaser' || v.type === 'Trailer'));
    }, [location]);

    return (
        <Grid container spacing={4} className={classes.container}>
            <Box
                sx={{
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '-1',
                    filter: 'blur(4px)',
                    background:
                        backgroundImg &&
                        `linear-gradient(var(--second-bg),var(--main-bg)),url('${IMG_URL_BG}${backgroundImg.file_path}') no-repeat center / cover`,
                }}
            />
            <Grid item lg={4}>
                <Box>
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
                <Box className={classes.iconlist}>
                    <IconButton>
                        <Favorite className={classes.icon} />
                    </IconButton>
                    <IconButton>
                        <Bookmark className={classes.icon} />
                    </IconButton>
                    <IconButton>
                        <ChatBubbleOutlined className={classes.icon} />
                    </IconButton>
                </Box>
            </Grid>
            <Grid item lg={8}>
                <Grid container>
                    <Grid item xs={12} sm={8}>
                        <Typography className={classes.title}>{movie.title}</Typography>
                    </Grid>
                    <Grid
                        item
                        sm={4}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <StarOutline sx={{ marginRight: '.5rem', color: '#F0B734' }} />
                        <Typography className={classes.text}>{movie.vote_average}/10</Typography>
                    </Grid>
                </Grid>
                <Grid>
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
                </Grid>
                <Grid>
                    <Typography className={classes.head}>電影概要</Typography>
                    <Typography className={classes.text}>{movie.overview || '無相關電影概要'}</Typography>
                </Grid>
                <Grid>
                    <Typography className={classes.head}>演員</Typography>
                    <Box sx={{ width: '56vw' }}>
                        <Row data={actor} type={'actor'} />
                    </Box>
                </Grid>
                <Grid>
                    <Typography className={classes.head}>留言</Typography>
                    <CommentList />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MovieInfo;
