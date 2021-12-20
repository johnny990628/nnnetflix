import React, { useState } from "react";

import { Tabs, Tab, Box, AppBar, Toolbar, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Navtop = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          {/* <Tabs value={value} textColor="inherit" onChange={handleChange}>
                        <Tab label="Main" component={Link} to="/" />
                        <Tab label="Popular" component={Link} to="/popular" />
                    </Tabs> */}
          <div>
            <SearchIcon />
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navtop;
