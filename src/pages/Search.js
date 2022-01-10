import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import MovieList from "../components/movielist";

const useStyles = makeStyles((theme) => ({}));

const Discover = () => {
  const classes = useStyles();

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const searchQuery = params.get("query");

  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(searchQuery);
  }, [location]);

  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography>搜尋結果:{value || "熱門電影"}</Typography>
      <MovieList query={value} />
    </Box>
  );
};

export default Discover;
