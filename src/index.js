import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import './assets/css/index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../node_modules/react-modal-video/scss/modal-video.scss';
import Layout from './components/layout';

const theme = createTheme({
    typography: {
        fontFamily: `'cwTeXYen', sans-serif`,
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Layout />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
