import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  Button,
} from "@mui/material";

import { IMG_URL } from "../../api/api";
import Modal from "../modal";

const styles = {
  container: {
    position: "relative",
    maxWidth: "calc(100% - 1rem)",
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    transition: ".5s ease-out",
    "&:hover": {
      transform: "scale(1.02)",
      opacity: 1,
      cursor: "pointer",
      "& .overlay": {
        top: "0",
      },
    },
  },
  img: {
    borderRadius: "2rem",
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
  },
  title: {
    color: "var(--text-color)",
    margin: ".5rem",
  },
  text: {
    color: "var(--text-color)",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    margin: ".5rem",
  },
};

const MovieCard = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleModal = (isOpen) => {
    console.log(isOpen);
    setOpenModal(isOpen);
  };

  return (
    <Card sx={styles.container} elevation={0} onClick={() => handleModal(true)}>
      <Box>
        {/* {loading && <Skeleton sx={{ height: '35vw' }} />} */}
        <CardMedia
          component="img"
          src={IMG_URL + item.poster_path || item.backdrop_path}
          alt={item.title}
          loading="lazy"
          sx={styles.img}
          onLoad={() => {
            setLoading(false);
          }}
        />
        <Box className="overlay" sx={styles.overlay}>
          <Typography variant="h5" sx={styles.title}>
            {item.title}
          </Typography>
          <Typography sx={styles.text}>{item.release_date}</Typography>
          <Typography sx={styles.text}>{item.overview}</Typography>
        </Box>
      </Box>
      <Modal open={openModal} handleModal={handleModal} />
    </Card>
  );
};

export default MovieCard;
