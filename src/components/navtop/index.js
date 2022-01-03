import React, { useState } from "react";

import {
  IconButton,
  Avatar,
  Badge,
  AppBar,
  Toolbar,
  InputBase,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Search, Email, Notifications, Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const styles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  searchbar: {
    display: "flex",
    alignItems: "center",
    width: "20%",
    backgroundColor: "var(--searchbar-color)",
    "&:hover": {
      backgroundColor: "var(--searchbar-color-hover)",
    },
    borderRadius: "5px",
    padding: "5px",
  },
  input: {
    color: "var(--text-color)",
    flexGrow: 1,
  },

  icons: {
    display: "flex",
    alignItems: "center",
  },
  iconBtn: { color: "var(--text-color)", marginRight: "10px" },

  searchButton: { marginRight: "20px" },
};

const Navtop = ({ openDrawer }) => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{ backgroundColor: "var(--main-bg)" }}
    >
      <Toolbar sx={styles.toolbar}>
        <Box sx={{ display: "flex" }}>
          <IconButton sx={styles.iconBtn} onClick={openDrawer}>
            <Menu />
          </IconButton>
          {/* <Typography variant="h5">NNNETFLIX</Typography> */}
        </Box>
        {!isPhone && (
          <Box sx={styles.searchbar}>
            <Search sx={{ color: "var(--text-color)", margin: "0 10px" }} />
            <InputBase placeholder="Search..." sx={styles.input} />
          </Box>
        )}

        {/* <Tabs value={value} textColor="inherit" onChange={handleChange}>
                    <Tab label="Main" component={Link} to="/" />
                    <Tab label="Popular" component={Link} to="/popular" />
                </Tabs> */}

        <Box sx={styles.icons}>
          {isPhone && (
            <IconButton sx={styles.iconBtn}>
              <Search />
            </IconButton>
          )}
          <IconButton sx={styles.iconBtn}>
            <Badge badgeContent={4} color="primary">
              <Email />
            </Badge>
          </IconButton>
          <IconButton sx={styles.iconBtn}>
            <Badge badgeContent={6} color="primary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton sx={styles.iconBtn}>
            <Avatar color="primary">XUN</Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navtop;
