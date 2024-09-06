import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../css/common.css";
import "../../css/layout.css";
import logo from "../../images/logo.svg";
import icoTicket from "../../images/ico_ticket.png";
import btnClose from "../../images/btn_close.svg";
import icoSearchGray from "../../images/ico_search_gray.svg";
import icoLogout from "../../images/ico_logout.svg";
import btnTop from "../../images/btn_top.svg";

function CategoryPage() {
  const { categoryId } = useParams();
  const [newsData, setNewsData] = useState({
    newsList: { content: [] },
    resents: [],
    populars: [],
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;

  const [setCategories] = useState([]);

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
  });

  useEffect(() => {
    axios
      .get(
        `https://api.trend.rankify.best/api/v1/news?categoryId=${categoryId}&size=${pageSize}&page=${page}&recentNews=10&popularNews=10`
      )
      .then((response) => {
        if (response.data.message === "success") {
          setNewsData(response.data.data);
          const totalCounts = response.data.data.newsList.metadata.totalCounts;
          console.log("Total Counts:", totalCounts);
          const calculatedTotalPages =
            response.data.data.newsList.metadata.totalPages;
          setTotalPages(calculatedTotalPages);
        }
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, [categoryId, page, pageSize]);

  const stripImages = (htmlContent) => {
    return htmlContent.replace(/<img[^>]*>/g, "");
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <section className="contentsWrap">
        <div className="newsLayout">
          <div className="leftWrap">
            <div className="newsList">
              <div className="list">
                {newsData.newsList.content.map((news) => (
                  <Link
                    to={`/category/${categoryId}/news/${news.newsId}`}
                    key={news.newsId}
                  >
                    <ul className="hoverImgPt">
                      <div className="thumb">
                        <img src={news.thumbnail} alt={news.title} />
                      </div>
                      <li className="tit">{news.title}</li>
                      <li className="txt">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: stripImages(news.content),
                          }}
                        />
                      </li>
                      <li className="info">{news.pressName}</li>
                    </ul>
                  </Link>
                ))}
              </div>

              <div className="paging">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  이전
                </button>{" "}
                <span>
                  {page} / {totalPages}
                </span>{" "}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  다음
                </button>
              </div>
            </div>
          </div>

          <div className="rightWrap">
            <div className="rightSticky">
              <div className="stickyTitle">랭킹 뉴스</div>
              <div className="rankNews mgb40">
                <div className="rankChartRight">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={0}
                    pagination={{ el: ".swiper-pagination", clickable: true }}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                  >
                    {newsData.populars.map((popular, index) => (
                      <SwiperSlide key={popular.newsId}>
                        <div className="rankBox">
                          <div className="box">
                            <div className="rankTitle">
                              인기 뉴스 {index + 1}
                              <div className="arw s24"></div>
                            </div>
                            <div className="news">
                              <ul className="hoverImgPt">
                                <li className="num">{index + 1}</li>
                                <li className="title">{popular.title}</li>
                                <li className="thumb">
                                  <img
                                    src={popular.thumbnail}
                                    alt={popular.title}
                                  />
                                </li>
                              </ul>
                              <div className="swiper-button-next"></div>
                              <div className="swiper-button-prev"></div>
                              <div className="swiper-pagination"></div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              <div className="stickyTitle">실시간 인기기사</div>
              <div className="popularNewsRight">
                {newsData.resents.slice(0, 5).map((recent, index) => (
                  <Link
                    to={`/category/${categoryId}/news/${recent.newsId}`}
                    key={recent.newsId}
                  >
                    <ul>
                      <li>{index + 1}</li>
                      <li>{recent.title}</li>
                      <li>
                        <img src={recent.thumbnail} alt={recent.title} />
                      </li>
                    </ul>
                  </Link>
                ))}
              </div>

              <div className="stickyTitle">최신 기사</div>
              <div className="rtNewsRight">
                {newsData.newsList.content.slice(0, 4).map((recent) => (
                  <ul key={recent.newsId}>
                    <Link to={`/category/${categoryId}/news/${recent.newsId}`}>
                      <li>
                        <img src={recent.thumbnail} alt={recent.title} />
                      </li>
                      <li>{recent.title}</li>
                    </Link>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slideMenu">
        <div className="top">
          <ul className="logo">
            <img src={logo} alt="logo" />
          </ul>
          <ul className="close">
            <img src={btnClose} alt="close" />
          </ul>
        </div>
        <div className="info">
          <div className="login">
            <div className="name">홍길동</div>
          </div>
          <div className="vote">
            <div className="myVote">
              내 투표권<span>0개</span>
            </div>
            <div className="btn">
              <img src={icoTicket} alt="ticket" />
              투표권 구매
            </div>
          </div>
        </div>
        <div className="scroll">
          <div className="search">
            <img src={icoSearchGray} alt="search icon gray" />
            <input
              name="search"
              type="text"
              placeholder="검색어를 입력하세요"
            />
          </div>
          <div className="tab">
            <ul className="on">뉴스</ul>
            <ul>랭킹</ul>
          </div>
        </div>
        <div className="logout">
          <div className="btn">
            <img src={icoLogout} alt="logout" />
            로그아웃
          </div>
        </div>
      </section>

      <section id="moveBtn" className="moveTop">
        <img src={btnTop} alt="move top" />
      </section>
    </div>
  );
}

export default CategoryPage;
