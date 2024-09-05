import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../../css/common.css";
import "../../css/layout.css";

function NewsDetailPage() {
  const { categoryId, newsId } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);
  const [emotions, setEmotions] = useState([]);
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.trend.rankify.best/api/v1/news/${categoryId}/${newsId}?popularNews=10`
      )
      .then((response) => {
        if (response.data.message === "success") {
          setNewsDetail(response.data.data.newsDeatil);
          setEmotions(response.data.data.emotions);
          setRecents(response.data.data.resents);
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
      <section
        id="sticky"
        className="stickyArticleWrap"
        style={{ display: "none" }}
      >
        <div className="inBox">
          <div className="logo">
            <img src="../images/logo.svg" alt="" />
          </div>
          <div className="articleTitle">{newsDetail.title}</div>
          <div className="pc">
            <ul className="search">
              <a href="../main/main.html">
                <img src="../images/ico_search.svg" alt="" />
              </a>
            </ul>
            <ul className="btn">
              <img src="../images/ico_ticket.png" alt="" />
              투표권 구매
            </ul>
            <ul className="login">로그인</ul>
          </div>
          <div className="mo">
            <img src="../images/btn_share.svg" alt="" />
            <img src="../images/btn_fontsize.svg" alt="" />
          </div>
        </div>
        <div className="scrollProcess" style={{ width: "50%" }}></div>
      </section>

      <section className="contentsWrap">
        <div className="newsLayout">
          <div className="leftWrap">
            <div className="articleWrap">
              <div className="category ftSz16">{newsDetail.categoryName}</div>
              <div className="articleTitle ftSz36">{newsDetail.title}</div>
              <div className="info">
                <ul className="publisher">{newsDetail.authors}</ul>
                <ul className="date">
                  입력 {new Date(newsDetail.publishedAt).toLocaleString()}
                </ul>
                <ul className="btn">
                  <img src="../images/btn_share.svg" alt="" />
                  <img src="../images/btn_fontsize.svg" alt="" />
                </ul>
              </div>
              <div className="contents">
                <div className="break-words content ftSz18">
                  <div
                    dangerouslySetInnerHTML={{ __html: newsDetail.content }}
                  />
                </div>
              </div>
              <div className="publisherBot">{newsDetail.authors} 기자</div>
              <div className="tag">
                {newsDetail.keywords &&
                  newsDetail.keywords.map((keyword, index) => (
                    <ul key={index}>#{keyword}</ul>
                  ))}
              </div>
            </div>

            <div className="sectionTitleSub">
              <div className="title">이 기사, 어떠셨나요?</div>
            </div>
            <div className="newsVote">
              {emotions.map((emotion) => (
                <ul key={emotion.emotionType}>
                  <li>
                    <img src={emotion.iconUrl} alt={emotion.name} />
                  </li>
                  <li>{emotion.name}</li>
                  <li>{emotion.count}</li>
                </ul>
              ))}
            </div>

            <div className="commentWrap">
              <div className="totalCnt">댓글 0</div>
              <div className="writeBox">
                <div className="loginFalse">
                  <input name="nick" type="text" placeholder="닉네임" />
                  <input
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                  />
                </div>
                <div className="textareaBox">
                  <textarea></textarea>
                  <ul>
                    <li>0/500</li>
                    <li className="btn">등록</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="rightWrap">
            <div className="rightSticky">
              <div className="dcTrend">
                <div className="dcTitle">
                  실시간 인기투표<div className="arw s24"></div>
                </div>
                <div className="swiper dcTrendRoll">
                  <div className="swiper-wrapper">
                    <Swiper
                      direction={"vertical"}
                      slidesPerView={"auto"}
                      spaceBetween={0}
                      className="swiper-slide"
                    >
                      <SwiperSlide>
                        <ul className="hoverImgPt">
                          <li className="thumb">
                            <img
                              src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                              alt="치어리더"
                            />
                          </li>
                          <li className="info">
                            <dl className="date">23.06.14 ~ 24.06.30</dl>
                            <dl className="title">아이돌 걸그룹 랭킹</dl>
                            <dl className="btn">투표</dl>
                          </li>
                        </ul>
                      </SwiperSlide>
                      <SwiperSlide>
                        <ul className="hoverImgPt">
                          <li className="thumb">
                            <img
                              src="https://cdn.hankyung.com/photo/202404/BF.36389450.1.jpg"
                              alt="아이돌 보이그룹"
                            />
                          </li>
                          <li className="info">
                            <dl className="date">23.06.14 ~ 24.06.30</dl>
                            <dl className="title">아이돌 보이그룹 랭킹</dl>
                            <dl className="btn">투표</dl>
                          </li>
                        </ul>
                      </SwiperSlide>
                      <SwiperSlide>
                        <ul className="hoverImgPt">
                          <li className="thumb">
                            <img
                              src="https://file2.nocutnews.co.kr/newsroom/image/2022/01/31/202201312047237692_0.jpg"
                              alt="트로트 가수"
                            />
                          </li>
                          <li className="info">
                            <dl className="date">23.06.14 ~ 24.06.30</dl>
                            <dl className="title">트로트 가수 남성 랭킹</dl>
                            <dl className="btn">투표</dl>
                          </li>
                        </ul>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>

              <div className="stickyTitle">
                <span>스포츠</span> 주요뉴스
              </div>
              <div className="popularNewsRight">
                {recents.slice(0, 10).map((recent, index) => (
                  <ul key={recent.newsId}>
                    <li>{index + 1}</li>
                    <li>{recent.title}</li>
                    <li>
                      <img src={recent.thumbnail} alt={recent.title} />
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsDetailPage;
