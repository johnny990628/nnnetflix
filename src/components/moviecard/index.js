import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Skeleton } from '@mui/material';

import { IMG_URL } from '../../api/api';

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
    },
    img: {
        maxWidth: 'calc(100% - 1rem)',
        objectFit: 'contain',
        transition: '.3s ease-out',
        '&:hover': {
            transform: 'scale(1.02)',
            opacity: 1,
            cursor: 'pointer',
        },
    },
    content: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'black',
    },
    text: {
        color: 'var(--text-color)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
};

const MovieCard = ({ item }) => {
    const [loading, setLoading] = useState(true);
    return (
        <Box sx={styles.container}>
            {/* {loading && <Skeleton sx={{ height: '35vw' }} />} */}
            <Box
                component="img"
                src={IMG_URL + item.poster_path || item.backdrop_path}
                alt={item.title}
                loading="lazy"
                sx={styles.img}
                onLoad={() => {
                    setLoading(false);
                }}
            />
            <Box sx={styles.content}>
                <Box sx={styles.text}>{item.title}</Box>
            </Box>
        </Box>
    );
};

export default MovieCard;
