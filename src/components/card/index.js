import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { IMG_URL } from "../../api/api";

const styles = {
  row: {
    borderRadius: "10px",
    maxWidth: "calc(100% - 1rem)",
    objectFit: "contain",
    marginRight: "10px",
    "&:hover": {
      transform: "scale(1.02)",
      opacity: 1,
    },
  },
};

const Card = ({ item }) => {
  return (
    <>
      <Box
        key={item.id}
        component="img"
        src={IMG_URL + item.poster_path || item.backdrop_path}
        alt={item.title}
        sx={styles.row}
        loading="lazy"
      />
    </>
  );
};

export default Card;
