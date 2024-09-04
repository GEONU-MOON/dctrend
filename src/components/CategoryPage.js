import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/common.css";
import "../css/layout.css";
import logo from "../images/logo.svg";
import icoSearch from "../images/ico_search.svg";
import icoTicket from "../images/ico_ticket.png";
import btnMenu from "../images/btn_menu.svg";
import btnClose from "../images/btn_close.svg";
import icoSearchGray from "../images/ico_search_gray.svg";
import icoLogout from "../images/ico_logout.svg";
import btnTop from "../images/btn_top.svg";
import { Link } from "react-router-dom";

function CategoryPage() {
  const { categoryId } = useParams();
  const [newsData, setNewsData] = useState({
    newsList: { content: [] },
    resents: [],
    populars: [],
  });

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

  useEffect(() => {
    axios
      .get(
        `https://api.trend.rankify.best/api/v1/news?categoryId=${categoryId}&size=12&page=1&recentNews=10&popularNews=10`
      )
      .then((response) => {
        if (response.data.message === "success") {
          setNewsData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, [categoryId]);

  const stripImages = (htmlContent) => {
    return htmlContent.replace(/<img[^>]*>/g, "");
  };

  return (
    <div>
      <section className="topWrap">
        <div className="naviDc">
          <div className="navi">
            <ul>디시인사이드</ul>
            <ul>갤러리</ul>
            <ul>마이너갤</ul>
            <ul>미니갤</ul>
            <ul>갤로그</ul>
            <ul>이벤트</ul>
            <ul>디시콘</ul>
          </div>
        </div>
        <div className="top">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="section">
            <ul className="on">뉴스</ul>
            <ul>랭킹</ul>
          </div>
          <div className="pc">
            <ul className="search">
              <div className="inp">
                <input
                  name="search"
                  type="text"
                  placeholder="검색어를 입력하세요"
                />
                <img
                  className="clickSearch"
                  src={icoSearch}
                  alt="search icon"
                />
              </div>
              <a>
                <img className="openSearch" src={icoSearch} alt="open search" />
              </a>
            </ul>
            <ul className="btn">
              <img src={icoTicket} alt="ticket" />
              투표권 구매
            </ul>
            <ul className="login">로그인</ul>
          </div>
          <div className="mo slideMenuOpen">
            <img src={btnMenu} alt="menu" />
          </div>
        </div>
        <div className="menuBox">
          <ul className="dep1">
            <li className="menu">
              <Link to="/">
                <dl className="on">트렌드 뉴스</dl>
              </Link>
              <a>
                <dl>디시이슈</dl>
              </a>
              <a>
                <dl>디시인터뷰</dl>
              </a>
            </li>
          </ul>
          <ul className="dep2">
            <li className="menu">
              <dl className="on">
                <Link to="/">
                  <dt className="on">전체</dt>
                </Link>
                {categories.map((category) => (
                  <Link key={category.id} to={`/category/${category.id}`}>
                    <dt>{category.name}</dt>
                  </Link>
                ))}
              </dl>
            </li>
          </ul>
        </div>
      </section>

      <section className="contentsWrap">
        <div className="newsLayout">
          <div className="leftWrap">
            <div className="newsList">
              <div className="list">
                {newsData.newsList.content.map((news) => (
                  <ul className="hoverImgPt" key={news.newsId}>
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
                ))}
              </div>
              <div className="paging"></div>
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
                {newsData.resents.map((recent, index) => (
                  <ul key={recent.newsId}>
                    <li>{index + 1}</li>
                    <li>{recent.title}</li>
                    <li>
                      <img src={recent.thumbnail} alt={recent.title} />
                    </li>
                  </ul>
                ))}
              </div>

              <div className="stickyTitle">최신 기사</div>
              <div className="rtNewsRight">
                {newsData.newsList.content.slice(0, 5).map((recent) => (
                  <ul key={recent.newsId}>
                    <li>
                      <img src={recent.thumbnail} alt={recent.title} />
                    </li>
                    <li>{recent.title}</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footer">
        <ul className="btnBox">
          <li>로그인</li>
          <li>PC버전</li>
          <li>디시인사이드</li>
        </ul>
        <ul className="items">
          <li className="mx">회사소개</li>
          <li className="mx">인재채용</li>
          <li className="mx">제휴안내</li>
          <li className="mx">광고안내</li>
          <li>이용약관</li>
          <li>
            <span>개인정보처리방침</span>
          </li>
          <li>피드백센터</li>
          <li>등록번호 : 자00525</li>
          <li>기사배열 책임자 : 박유진</li>
          <li>청소년보호 책임자 : 박주돈</li>
        </ul>
        <ul className="copyright">
          Copyright ⓒ 1999 - 2024 dcinside. All rights reserved.
        </ul>
        <ul className="info">
          디시트렌드에서 사용되는 모든 인물 이미지와 콘텐츠는 저작권 및 초상권을
          침해하지 않도록 최선을 다하고 있습니다.
          <br />
          만약 저작권 또는 초상권 침해와 관련된 문제가 발생할 경우, 신속하고
          적절한 조치를 취할 것을 약속드립니다.
          <br />
          문제가 발생하면 <span>피드백 센터</span>를 통해 신고해 주시기
          바랍니다.
        </ul>
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
