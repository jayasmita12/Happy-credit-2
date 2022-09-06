import React from "react";
import { Routes, Route } from "react-router-dom";
import { CardItem } from "./Card";
import { SingleUser } from "./SingleUser";

export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CardItem />}></Route>
        <Route path="/user/:id" element={<SingleUser />}></Route>
      </Routes>
    </div>
  );
};
