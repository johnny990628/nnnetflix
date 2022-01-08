import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Skeleton, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PlayArrow } from '@mui/icons-material';
import { IMG_URL } from '../../api/api';
import Modal from '../modal';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        maxWidth: 'calc(100% - 1rem)',
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        transition: 'all .5s ease-out',
        '&:hover': {
            transform: 'scale(1.02)',
            opacity: 1,
            cursor: 'pointer',
            '& .overlay': {
                top: '0',
            },
        },
    },
    img: {
        borderRadius: '2rem',
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.7)',
        width: '100%',
        height: '100%',
        color: 'var(--text-color)',
        borderRadius: '2rem',
        textAlign: 'center',
        padding: '1rem',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        color: 'var(--text-color)',
        margin: '.5rem',
        fontSize: '2rem',
        [theme.breakpoints.down('md')]: { fontSize: '1.2rem' },
        [theme.breakpoints.down('sm')]: { fontSize: '1rem' },
    },
    text: {
        color: 'var(--text-color)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '.5rem',
        fontSize: '1.2rem',
        [theme.breakpoints.down('md')]: { fontSize: '1rem' },
        [theme.breakpoints.down('sm')]: { fontSize: '.8rem' },
    },
}));

const MovieCard = ({ item }) => {
    const classes = useStyles();
    const location = useLocation();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleModal = (isOpen) => {
        setOpenModal(isOpen);
    };

    return (
        <Link to={`/movie/${item.id}`}>
            <Card
                className={classes.container}
                elevation={0}
                // onClick={() => handleModal(true)}
            >
                <Box>
                    {/* {loading && <Skeleton sx={{ height: '35vw' }} />} */}
                    <CardMedia
                        component="img"
                        src={`${IMG_URL}${item.poster_path || item.backdrop_path}`}
                        alt={item.title}
                        loading="lazy"
                        className={classes.img}
                        onLoad={() => {
                            setLoading(false);
                        }}
                    />

                    {location.pathname.includes('movie') ? (
                        <Box className={['overlay', classes.overlay]} sx={{ alignItems: 'center' }}>
                            <PlayArrow sx={{ fontSize: '5rem' }} />
                        </Box>
                    ) : (
                        <Box className={['overlay', classes.overlay]}>
                            <Typography className={classes.title}>{item.title}</Typography>
                            <Typography className={classes.text}>{item.release_date}</Typography>
                            <Typography className={classes.text}>{item.overview}</Typography>
                        </Box>
                    )}
                </Box>
                {/* <Modal open={openModal} handleModal={handleModal} /> */}
            </Card>
        </Link>
    );
};

export default MovieCard;
