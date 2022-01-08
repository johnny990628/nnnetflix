import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Slider from 'react-slick';
import API, { IMG_URL } from '../../api/api';

import MovieCard from '../moviecard';
import ActorCard from '../actorcard';

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
            breakpoint: 1440,
            settings: {
                slidesToShow: 5,
                infinite: true,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                infinite: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                infinite: true,
            },
        },
    ],
};

const Row = ({ data, type = 'movie' }) => {
    return (
        <Slider {...settings}>
            {data.map((item) => {
                return type === 'movie' ? <MovieCard item={item} /> : <ActorCard item={item} />;
            })}
        </Slider>
    );
};

export default Row;
