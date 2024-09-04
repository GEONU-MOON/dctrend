import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./components/pages/CategoryPage.js";
import Home from "./components/pages/Main.js";
import Header from "./components/common/Header.js";
import Footer from "./components/common/Footer.js";
import axios from "axios";
import "./css/common.css";
import "./css/layout.css";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.trend.rankify.best/api/v1/news/categories")
      .then((response) => {
        if (response.data.message === "success") {
          setCategories(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <Router>
      <Header categories={categories} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
