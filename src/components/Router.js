import React from "react";
import { Routes, Route } from "react-router-dom";
import Popular from "../pages/Popular";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Categories from "../pages/Categories";
import Setting from "../pages/Setting";
import MovieInfo from "../pages/MovieInfo";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/search" element={<Search />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/movie/:movieID" element={<MovieInfo />} />
    </Routes>
  );
};

export default Router;
