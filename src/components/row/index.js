import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Slider from "react-slick";
import API, { IMG_URL } from "../../api/api";

import Card from "../card";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(3),
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: { fontSize: "2rem" },
    [theme.breakpoints.up("md")]: { fontSize: "2.5rem" },
  },
}));

const Arrow = ({ className, style, onClick, isLeft }) => {
  return (
    <>
      {isLeft ? (
        <ArrowBackIosIcon
          className={className}
          style={{ ...style, display: "block", color: "white" }}
          onClick={onClick}
        />
      ) : (
        <ArrowForwardIosIcon
          className={className}
          style={{ ...style, display: "block", color: "white" }}
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
        slidesToShow: 4,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        infinite: true,
      },
    },
  ],
};

const Row = ({ title, type }) => {
  const bpStyles = useStyles();
  const [movie, setMovie] = useState([]);
  useEffect(async () => {
    const movies = await API.getMovie(type);
    setMovie(movies);
  }, []);

  return (
    <Box>
      <Typography className={bpStyles.title}>{title}</Typography>
      <Slider {...settings}>
        {movie.map((item) => {
          return <Card item={item} />;
        })}
      </Slider>
    </Box>
  );
};

export default Row;
