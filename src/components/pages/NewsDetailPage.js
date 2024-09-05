import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function NewsDetailPage() {
  const { categoryId, newsId } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);
  const [emotions, setEmotions] = useState([]);

  useEffect(() => {
    console.log(
      `Fetching details for categoryId: ${categoryId}, newsId: ${newsId}`
    );
    axios
      .get(
        `https://api.trend.rankify.best/api/v1/news/${categoryId}/${newsId}?popularNews=10`
      )
      .then((response) => {
        console.log("API response:", response.data.data);
        if (response.data.message === "success") {
          setNewsDetail(response.data.data.newsDeatil);
          setEmotions(response.data.data.emotions);
        } else {
          console.error("API response not successful:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching news details:", error);
      });
  }, [categoryId, newsId]);

  if (!newsDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{newsDetail.title}</h1>
      <p>작성자: {newsDetail.authors}</p>
      <img src={newsDetail.thumbnail} alt={newsDetail.title} />
      <div dangerouslySetInnerHTML={{ __html: newsDetail.content }} />

      <div className="emotions">
        {emotions.map((emotion) => (
          <div key={emotion.emotionType} className="emotion">
            <img src={emotion.iconUrl} alt={emotion.name} />
            <span>
              {emotion.name}: {emotion.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsDetailPage;
