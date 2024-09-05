import { Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage.js";
import Home from "./pages/Main.js";
import NewsDetailPage from "./pages/NewsDetailPage.js";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route
        path="/category/:categoryId/news/:newsId"
        element={<NewsDetailPage />}
      />{" "}
    </Routes>
  );
}

export default AppRouter;
