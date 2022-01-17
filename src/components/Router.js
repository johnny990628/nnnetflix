import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Popular from '../pages/Popular';
import Home from '../pages/Home';
import Search from '../pages/Search';
import NowPlaying from '../pages/NowPlaying';
import TopRated from '../pages/TopRated';
import MovieInfo from '../pages/MovieInfo';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />
            <Route path="/nowplaying" element={<NowPlaying />} />
            <Route path="/toprated" element={<TopRated />} />
            <Route path="/movie/:movieID" element={<MovieInfo />} />
        </Routes>
    );
};

export default Router;
