import React from "react";
import { Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage.js";
import Home from "./pages/Main.js";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
    </Routes>
  );
}

export default AppRouter;
