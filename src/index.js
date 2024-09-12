import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

if (!window.Kakao.isInitialized()) {
  window.Kakao.init("d39de52ae780e81f972d94758cab71b8");
  console.log("Kakao SDK Initialized");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
