import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InfiniteScroll from "react-infinite-scroll-component";

import API, { IMG_URL } from "../../api/api";
import LoadingGif from "../../assets/loading.gif";

import MovieCard from "../moviecard";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "1rem",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(3,1fr)",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(4,1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(5,1fr)",
    },
  },
}));

const MovieList = ({ type }) => {
  const classes = useStyles();
  const [movie, setMovie] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [params, setParams] = useState("");

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    setPage(1);
    setMovie([]);
    setParams(query);
  }, [location.search]);

  useEffect(() => {
    fetchData();
  }, [params]);

  const fetchData = async () => {
    try {
      setPage(page + 1);
      const movieResponse = params
        ? await API.getSearch(params, page)
        : await API.getMovie(type, page);
      setMovie((prevMovies) => [...prevMovies, ...movieResponse]);
    } catch (e) {
      console.log(e);
      setHasMore(false);
    }
  };

  return (
    <InfiniteScroll
      className={classes.container}
      dataLength={movie.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={LoadingGif}
            alt="Loading..."
            style={{
              borderRadius: "2rem",
              width: "100%",
              heigth: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      }
      endMessage={<Box />}
    >
      {movie.map((item) => {
        return <MovieCard key={item.id} item={item} />;
      })}
    </InfiniteScroll>
  );
};

export default MovieList;
