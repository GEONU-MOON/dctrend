import { useState, useEffect } from "react";
import axios from "axios";

export const useCategories = () => {
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

  return categories;
};
