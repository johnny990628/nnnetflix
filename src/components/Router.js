import React from "react";
import { Routes, Route } from "react-router-dom";
import Popular from "../pages/Popular";
import Home from "../pages/Home";
import Discover from "../pages/Discover";
import Categories from "../pages/Categories";
import Setting from "../pages/Setting";
import MovieInfo from "../pages/MovieInfo";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/movie/:movieID" element={<MovieInfo />} />
    </Routes>
  );
};

export default Router;
