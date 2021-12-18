import React from 'react';
import { Box } from '@mui/material';

import Row from '../components/row';

const styles = {
    container: {},
};

const Home = () => {
    return (
        <Box>
            <Row title={'熱門電影'} type={'popular'} />
            <Row title={'熱映電影'} type={'now_playing'} />
            <Row title={'評分最高'} type={'top_rated'} />
        </Box>
    );
};

export default Home;
