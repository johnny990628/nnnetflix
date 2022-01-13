import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { makeStyles } from "@mui/styles";
import { PlayArrow } from "@mui/icons-material";
import { IMG_URL } from "../../api/api";
import Modal from "../modal";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    maxWidth: "calc(100% - 1rem)",
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    transition: "transform .5s ease-out",
    "&:hover": {
      transform: "scale(1.02)",
      opacity: 1,
      cursor: "pointer",
      "& .overlay": {
        top: "0",
        opacity: "1",
      },
    },
  },
  img: {
    borderRadius: "2rem",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,.7)",
    width: "100%",
    height: "100%",
    color: "var(--text-color)",
    borderRadius: "2rem",
    textAlign: "center",
    padding: "1rem",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    opacity: "0",
    transition: "opacity .3s .3s ease-out",
  },
  title: {
    color: "var(--text-color)",
    margin: ".5rem",
    fontSize: "2rem",
    [theme.breakpoints.down("md")]: { fontSize: "1.2rem" },
    [theme.breakpoints.down("sm")]: { fontSize: "1rem" },
  },
  text: {
    color: "var(--text-color)",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    margin: ".5rem",
    fontSize: "1.2rem",
    [theme.breakpoints.down("md")]: { fontSize: "1rem" },
    [theme.breakpoints.down("sm")]: { fontSize: ".8rem" },
  },
}));

const MovieCard = ({ item }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      whileTap={{ scale: 0.93 }}
    >
      <Link to={`/movie/${item.id}`}>
        <Card
          className={classes.container}
          elevation={0}
          // onClick={() => handleModal(true)}
        >
          <Box>
            <LazyLoadImage
              src={`${IMG_URL}${item.poster_path || item.backdrop_path}`}
              alt={item.title}
              className={classes.img}
              effect="blur"
            />

            {location.pathname.includes("movie") ? (
              <Box
                className={["overlay", classes.overlay]}
                sx={{ alignItems: "center" }}
              >
                <PlayArrow sx={{ fontSize: "5rem" }} />
              </Box>
            ) : (
              <Box className={["overlay", classes.overlay]}>
                <Typography className={classes.title}>{item.title}</Typography>
                <Typography className={classes.text}>
                  {item.release_date}
                </Typography>
                <Typography className={classes.text}>
                  {item.overview}
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
