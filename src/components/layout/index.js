import React, { useState } from "react";
import Sidebar from "../sidebar";
import Drawer from "../drawer";
import Navtop from "../navtop";
import Router from "../Router";

import { useMediaQuery, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
const Layout = () => {
  const theme = useTheme();
  const isComputer = useMediaQuery(theme.breakpoints.up("lg"));
  const [drawer, setDrawer] = useState(false);
  const openDrawer = () => {
    setDrawer(true);
  };
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <Navtop openDrawer={openDrawer} />
        <Drawer isOpen={drawer} isComputer={isComputer} setDrawer={setDrawer} />
        <Box
          sx={{
            width: "calc(90% - var(--drawer-width))",
            margin: "3rem 0 2.5rem 4rem",
            padding: "1rem",
          }}
        >
          <Router />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default Layout;
