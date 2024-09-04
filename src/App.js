import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AppRouter from "./components/AppRouter";
import { useCategories } from "./hooks/useCategories";
import "./css/common.css";
import "./css/layout.css";

function App() {
  const categories = useCategories();

  return (
    <Router>
      <Header categories={categories} />
      <AppRouter />
      <Footer />
    </Router>
  );
}

export default App;
