import React, { useState } from "react";
import axios from "axios";

function VoteBox({ initialGood, initialBad, id, type, state }) {
  const [good, setGood] = useState(initialGood);
  const [bad, setBad] = useState(initialBad);

  // 투표 처리 함수
  const handleClick = async (feel) => {
    if (state === "INACTIVE") {
      return;
    }
    try {
      const url = `https://api.trend.rankify.best/api/v1/comments/news/${type}/${id}/${feel}`;
      const response = await axios.get(url, {
        headers: {
          "X-API-KEY": "AdswKr3yJ5lHkWllQUr6adnY9Q4aoqHh0KfwBeyb14",
        },
      });

      // 성공적인 응답 처리
      if (response.data.message === "success") {
        if (feel === "recommend") {
          setGood(response.data.data); // 추천 수 업데이트
        } else {
          setBad(response.data.data); // 비추천 수 업데이트
        }
      }
    } catch (error) {
      console.error("Error handling vote:", error);
    }
  };

  return (
    <>
      <li className="vote">
        <dl
          className={`good ${state === "INACTIVE" ? "block" : ""}`}
          onClick={() => handleClick("recommend")}
        >
          <img
            src="https://cdn.trend.rankify.best/dctrend/front/images/ico_cmt_good.svg"
            alt="추천"
          />
          {good}
        </dl>
        <dl
          className={`bad ${state === "INACTIVE" ? "block" : ""}`}
          onClick={() => handleClick("dislike")}
        >
          <img
            src="https://cdn.trend.rankify.best/dctrend/front/images/ico_cmt_bad.svg"
            alt="비추천"
          />
          {bad}
        </dl>
      </li>
    </>
  );
}

export default VoteBox;
