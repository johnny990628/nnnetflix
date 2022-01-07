import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import API, { IMG_URL } from "../api/api";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
  },
}));

const MovieInfo = () => {
  const classes = useStyles();
  const { movieID } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(async () => {
    const result = await API.getMovieInfo(movieID);
    setMovie(result);
  }, [movie]);
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <img
          src={`${IMG_URL}${movie.poster_path || movie.backdrop_path}`}
          alt={movie.title}
          className={classes.img}
        />
      </Grid>
      <Grid item xs={8}>
        {movie.title}
      </Grid>
    </Grid>
  );
};

export default MovieInfo;
