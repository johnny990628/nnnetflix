import React, { useState, useEffect } from 'react';
import Drawer from '../drawer';
import Navtop from '../navtop';
import Router from '../Router';

import { useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

const Layout = () => {
    const theme = useTheme();

    const isComputer = useMediaQuery(theme.breakpoints.up('md'));
    const [drawer, setDrawer] = useState(false);

    const openDrawer = () => {
        setDrawer(true);
    };

    return (
        <BrowserRouter>
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                {/* For backgroundColor */}
                <Box
                    sx={{
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        width: '100%',
                        height: '100%',
                        zIndex: '-1',
                        background: `linear-gradient(var(--main-bg),var(--second-bg))`,
                    }}
                />
                <Navtop openDrawer={openDrawer} />
                <Drawer isOpen={drawer} isComputer={isComputer} setDrawer={setDrawer} />
                <Box
                    sx={{
                        width: isComputer ? 'calc(90% - var(--drawer-width))' : '90%',
                        margin: isComputer ? '2rem 3rem' : '2rem',
                        padding: '1.5rem',
                    }}
                >
                    <Router />
                </Box>
            </Box>
        </BrowserRouter>
    );
};

export default Layout;
