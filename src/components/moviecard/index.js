import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia } from "@mui/material";

import { IMG_URL } from "../../api/api";

const styles = {
  card: {
    position: "relative",
    maxWidth: "calc(100% - 1rem)",
    objectFit: "contain",
    marginRight: "10px",
    padding: ".3rem",
    backgroundColor: "transparent",
    "&:hover": {
      transform: "scale(1.02)",
      opacity: 1,
      cursor: "pointer",
    },
  },
  text: {
    color: "var(--text-color)",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
};

const MovieCard = ({ item }) => {
  return (
    <Card sx={styles.card} elevation={0}>
      <Box>
        <CardMedia
          component="img"
          src={IMG_URL + item.poster_path || item.backdrop_path}
          alt={item.title}
          loading="lazy"
          sx={{ borderRadius: "10px" }}
        />
        <CardContent>
          <Box sx={styles.text}>{item.title}</Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MovieCard;
