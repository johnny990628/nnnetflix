import { Box } from "@mui/material";
import React from "react";
import MovieList from "../components/movielist";

const Popular = () => {
  return (
    <Box>
      <MovieList type={"popular"} />
    </Box>
  );
};

export default Popular;
