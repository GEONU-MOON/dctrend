import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AppRouter from "./components/AppRouter";
import { useCategories } from "./hooks/useCategories";
import { BackHistoryProvider } from "./components/BackHistoryContext";

function App() {
  const categories = useCategories();

  return (
    <BackHistoryProvider>
      {" "}
      {/* BackHistoryProvider로 감싸기 */}
      <Router>
        <Header categories={categories} />
        <AppRouter />
        <Footer />
      </Router>
    </BackHistoryProvider>
  );
}

export default App;
