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
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Navtop />
                </Grid>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={8} sx={{ margin: '50px' }}>
                    <Router />
                </Grid>
            </Grid>
        </BrowserRouter>
    );
};

export default Layout;
