import React from 'react';
import Sidebar from '../sidebar';
import Navtop from '../navtop';
import Router from '../Router';
import { Grid } from '@mui/material';

// import './layout.css';
import { BrowserRouter } from 'react-router-dom';
const Layout = () => {
    return (
        <BrowserRouter>
            <Grid container spacing={3} style={{ height: '100vh' }}>
                {/* <Grid item xs={12} md={2} style={{ borderRight: '1px solid var(--main-color)' }}>
                    <Sidebar />
                </Grid> */}
                <Grid item>
                    <Navtop />
                    {/* <Router /> */}
                </Grid>
            </Grid>
        </BrowserRouter>
    );
};

export default Layout;
