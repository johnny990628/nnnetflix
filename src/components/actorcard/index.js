import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Skeleton, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IMG_URL } from '../../api/api';

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
        fontSize: '1.2rem',
        [theme.breakpoints.up('md')]: { fontSize: '1.2rem' },
    },
    text: {
        color: 'var(--text-color)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '.5rem',
        fontSize: '.5rem',
        [theme.breakpoints.up('md')]: { fontSize: '.8rem' },
    },
}));

const ActorCard = ({ item }) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    return (
        <Box>
            <Card className={classes.container} elevation={0}>
                <Box>
                    {/* {loading && <Skeleton sx={{ height: '35vw' }} />} */}
                    <CardMedia
                        component="img"
                        src={`${IMG_URL}${item.profile_path}`}
                        alt={item.name}
                        loading="lazy"
                        className={classes.img}
                        onLoad={() => {
                            setLoading(false);
                        }}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                                'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4SYTH5FdB0dAORV98Nwg3llgVnY.jpg';
                        }}
                    />

                    <Box className={['overlay', classes.overlay]}>
                        <Typography className={classes.title}>{item.character}</Typography>
                        <Typography className={classes.text}>{item.name}</Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default ActorCard;
