import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ent from "./components/Ent.js";
import Home from "./components/Main.js";
import "./css/common.css";
import "./css/layout.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ent" element={<Ent />} />
      </Routes>
    </Router>
  );
}

export default App;
