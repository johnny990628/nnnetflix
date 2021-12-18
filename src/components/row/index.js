import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, CardActions, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Slider from 'react-slick';
import API, { IMG_URL } from '../../api/api';

const styles = {
    cardText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    cardBar: { backgroundColor: 'rgba(0,255,204,0.2)' },
    rows: {
        display: 'flex',
        overflowY: 'hidden',
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        width: '100%',
        padding: '20px',
        transition: 'transform 1s',
        position: 'relative',
    },
    row: {
        borderRadius: '10px',
        maxHeight: '300px',
        objectFit: 'contain',
        marginRight: '10px',
        '&:hover': {
            transform: 'scale(1.02)',
            opacity: 1,
        },
    },
};

const Arrow = ({ className, style, onClick, isLeft }) => {
    return (
        <>
            {isLeft ? (
                <ArrowBackIosIcon
                    className={className}
                    style={{ ...style, display: 'block', color: 'white' }}
                    onClick={onClick}
                />
            ) : (
                <ArrowForwardIosIcon
                    className={className}
                    style={{ ...style, display: 'block', color: 'white' }}
                    onClick={onClick}
                />
            )}
        </>
    );
};

const settings = {
    infinite: true,
    slidesToShow: 6,
    swipeToSlide: true,
    nextArrow: <Arrow isLeft={false} />,
    prevArrow: <Arrow isLeft={true} />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
            },
        },
    ],
};
const Row = ({ title, type }) => {
    const [movie, setMovie] = useState([]);
    useEffect(async () => {
        const movies = await API.getMovie(type);
        setMovie(movies);
    }, []);

    return (
        <Box sx={{ width: '95%', margin: '20px' }}>
            <Typography sx={{ fontSize: '40px', margin: '20px' }}>{title}</Typography>
            <Slider {...settings}>
                {movie.map((item) => {
                    return (
                        <Box>
                            <Box
                                key={item.id}
                                component="img"
                                src={IMG_URL + item.poster_path}
                                alt={item.title}
                                sx={styles.row}
                            />
                        </Box>
                    );
                })}
            </Slider>
        </Box>
    );
};

export default Row;
