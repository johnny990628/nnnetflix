import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Popular from '../pages/Popular';
import Home from '../pages/Home';
import Search from '../pages/Search';
import NowPlaying from '../pages/NowPlaying';
import TopRated from '../pages/TopRated';
import MovieInfo from '../pages/MovieInfo';
import Favorite from '../pages/Favorite';
import Collect from '../pages/Collect';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />
            <Route path="/nowplaying" element={<NowPlaying />} />
            <Route path="/toprated" element={<TopRated />} />
            <Route path="/movie/:movieID" element={<MovieInfo />} />
            <Route path="/like" element={<Favorite />} />
            <Route path="/collect" element={<Favorite />} />
        </Routes>
    );
};

export default Router;
