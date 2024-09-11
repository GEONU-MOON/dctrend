import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as AntPagination } from "antd";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "antd/dist/reset.css";
import "../../css/common.css";
import "../../css/layout.css";
import logo from "../../images/logo.svg";
import icoTicket from "../../images/ico_ticket.png";
import btnClose from "../../images/btn_close.svg";
import icoSearchGray from "../../images/ico_search_gray.svg";
import icoLogout from "../../images/ico_logout.svg";
import btnTop from "../../images/btn_top.svg";
import useCleanHTML from "../../hooks/useCleanHtml";

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

  const [categories, setCategories] = useState([]);

  // HTML 클린업 훅 사용
  const { cleanHTMLContent } = useCleanHTML();

  useEffect(() => {
    setPage(1); // 카테고리 변경 시 페이지 초기화
  }, [categoryId]);

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
        `https://api.trend.rankify.best/api/v1/news?categoryId=${categoryId}&size=${pageSize}&page=${page}&recentNews=10&popularNews=10`
      )
      .then((response) => {
        if (response.data.message === "success") {
          // console.log("News Data: ", response.data.data);
          setNewsData(response.data.data);
          const calculatedTotalPages =
            response.data.data.newsList.metadata.totalPages;
          setTotalPages(calculatedTotalPages);
        }
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, [categoryId, page, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <div>
        <section className="contentsWrap" style={{ minHeight: "2024px" }}>
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
                              __html: cleanHTMLContent(news.content),
                            }}
                          />
                        </li>
                        <li className="info">{news.pressName}</li>
                      </ul>
                    </Link>
                  ))}
                </div>

                <div className="paging">
                  <AntPagination
                    current={page}
                    pageSize={pageSize}
                    total={totalPages * pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    hideOnSinglePage={true}
                    showQuickJumper={false}
                  />
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
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      pagination={{ el: ".swiper-pagination", clickable: true }}
                      autoplay={{ delay: 2000, disableOnInteraction: false }}
                    >
                      <SwiperSlide>
                        <div className="rankBox">
                          <div className="box">
                            <div className="rankTitle">
                              아이돌 걸그룹 랭킹<div className="arw s24"></div>
                            </div>
                            <div className="rank">
                              <Swiper
                                direction="vertical"
                                slidesPerView={1}
                                spaceBetween={0}
                                loop={true}
                                autoplay={{
                                  delay: 2000,
                                  disableOnInteraction: false,
                                }}
                              >
                                <SwiperSlide>
                                  <ul>
                                    <li className="num">1</li>
                                    <li className="thumb">
                                      <img
                                        src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                                        alt="뉴진스"
                                      />
                                    </li>
                                    <li className="title">뉴진스</li>
                                    <li className="vote">4,224표</li>
                                  </ul>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <ul>
                                    <li className="num">2</li>
                                    <li className="thumb">
                                      <img
                                        src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                                        alt="에스파"
                                      />
                                    </li>
                                    <li className="title">에스파</li>
                                    <li className="vote">4,224표</li>
                                  </ul>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <ul>
                                    <li className="num">3</li>
                                    <li className="thumb">
                                      <img
                                        src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                                        alt="아이브"
                                      />
                                    </li>
                                    <li className="title">아이브</li>
                                    <li className="vote">4,224표</li>
                                  </ul>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <ul>
                                    <li className="num">4</li>
                                    <li className="thumb">
                                      <img
                                        src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                                        alt="QWER"
                                      />
                                    </li>
                                    <li className="title">QWER</li>
                                    <li className="vote">4,224표</li>
                                  </ul>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <ul>
                                    <li className="num">5</li>
                                    <li className="thumb">
                                      <img
                                        src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                                        alt="아일릿"
                                      />
                                    </li>
                                    <li className="title">아일릿</li>
                                    <li className="vote">4,224표</li>
                                  </ul>
                                </SwiperSlide>
                              </Swiper>
                            </div>
                            <div className="news">
                              <ul className="on hoverImgPt">
                                <li className="num">1</li>
                                <li className="title">
                                  혜인 합류…뉴진스 완전체 국내 음방 무대
                                  선보인다
                                </li>
                                <li className="thumb">
                                  <img
                                    src="https://img.etoday.co.kr/pto_db/2024/06/600/20240608095743_2034978_1200_901.jpg"
                                    alt="뉴진스"
                                  />
                                </li>
                              </ul>
                              <ul className="hoverImgPt">
                                <li className="num">2</li>
                                <li className="title">
                                  에스파 '슈퍼노바', 스포티파이 1억 스트리밍
                                  달성…통산 10번째
                                </li>
                                <li className="thumb">
                                  <img
                                    src="https://thumb.mt.co.kr/06/2024/07/2024071016194159841_1.jpg/dims/optimize/"
                                    alt="에스파"
                                  />
                                </li>
                              </ul>
                              <ul className="hoverImgPt">
                                <li className="num">3</li>
                                <li className="title">
                                  아이브 안유진 화보, 독보적 아우라 발산
                                </li>
                                <li className="thumb">
                                  <img
                                    src="https://contents-cdn.viewus.co.kr/image/2023/12/CP-2022-0017/image-de4d5a79-bbe3-4c2e-84a7-f36976345663.jpeg"
                                    alt="아이브"
                                  />
                                </li>
                              </ul>
                              <ul className="hoverImgPt">
                                <li className="num">4</li>
                                <li className="title">
                                  QWER, 실력파 춤 노래 연주 모두 '만점'
                                </li>
                                <li className="thumb">
                                  <img
                                    src="https://www.cbci.co.kr/news/photo/202407/470830_279178_189.jpg"
                                    alt="QWER"
                                  />
                                </li>
                              </ul>
                              <ul className="hoverImgPt">
                                <li className="num">5</li>
                                <li className="title">
                                  아일릿 원희, 목발 짚고 안쓰러운 日 출국…한쪽
                                  팔로 짐까지 바리바리
                                </li>
                                <li className="thumb">
                                  <img
                                    src="https://image.xportsnews.com/contents/images/upload/article/2024/0519/mb_1716106571678771.jpeg"
                                    alt="아일릿"
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="rankBox">
                          <div className="box">
                            <div className="rankTitle">
                              트로트 가수 랭킹<div className="arw s24"></div>
                            </div>
                            <div className="rank">
                              <Swiper
                                direction="vertical"
                                slidesPerView={1}
                                spaceBetween={0}
                                loop={true}
                                autoplay={{
                                  delay: 2000,
                                  disableOnInteraction: false,
                                }}
                              >
                                <SwiperSlide>
                                  <ul>
                                    <li className="num">1</li>
                                    <li className="thumb">
                                      <img
                                        src="https://newsimg.hankookilbo.com/cms/articlerelease/2021/10/07/c3f00183-307b-4530-a48b-f628e54bdf61.jpg"
                                        alt="임영웅"
                                      />
                                    </li>
                                    <li className="title">임영웅</li>
                                    <li className="vote">8,187표</li>
                                  </ul>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <ul>
                                    <li className="num">2</li>
                                    <li className="thumb">
                                      <img
                                        src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                                        alt="전유진"
                                      />
                                    </li>
                                    <li className="title">전유진</li>
                                    <li className="vote">4,224표</li>
                                  </ul>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <ul>
                                    <li className="num">3</li>
                                    <li className="thumb">
                                      <img
                                        src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                                        alt="이미나"
                                      />
                                    </li>
                                    <li className="title">이미나</li>
                                    <li className="vote">4,224표</li>
                                  </ul>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <ul>
                                    <li className="num">4</li>
                                    <li className="thumb">
                                      <img
                                        src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                                        alt="이찬원"
                                      />
                                    </li>
                                    <li className="title">이찬원</li>
                                    <li className="vote">4,224표</li>
                                  </ul>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <ul>
                                    <li className="num">5</li>
                                    <li className="thumb">
                                      <img
                                        src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                                        alt="박서진"
                                      />
                                    </li>
                                    <li className="title">박서진</li>
                                    <li className="vote">4,224표</li>
                                  </ul>
                                </SwiperSlide>
                              </Swiper>
                            </div>
                            <div className="news">
                              <ul className="on hoverImgPt">
                                <li className="num">1</li>
                                <li className="title">
                                  임영웅은 팬클럽 이름으로, ‘영웅시대’는 스타
                                  빛내려 기부 “善순환”
                                </li>
                                <li className="thumb">
                                  <img
                                    src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202309/26/27ccde99-eb16-49f8-a91b-d263a5def658.jpg"
                                    alt="임영웅"
                                  />
                                </li>
                              </ul>
                              <ul className="hoverImgPt">
                                <li className="num">2</li>
                                <li className="title">
                                  전유진, '현역가왕’ 1위 등극...‘트롯계 뉴진스’
                                </li>
                                <li className="thumb">
                                  <img
                                    src="https://www.dgmagazine.co.kr/news/photo/202402/5119_5970_3623.jpg"
                                    alt="전유진"
                                  />
                                </li>
                              </ul>
                              <ul className="hoverImgPt">
                                <li className="num">3</li>
                                <li className="title">
                                  최상위권 싹쓸이! 트롯 오디션 10대 열풍 이유
                                </li>
                                <li className="thumb">
                                  <img
                                    src="https://ilyo.co.kr/contents/article/images/2024/0131/1706666626470115.jpg"
                                    alt="트롯 오디션"
                                  />
                                </li>
                              </ul>
                              <ul className="hoverImgPt">
                                <li className="num">4</li>
                                <li className="title">
                                  이찬원 남동생, 얼마나 잘생겼길래… “아이돌
                                  못지않은 인기” (‘한끗차이’)
                                </li>
                                <li className="thumb">
                                  <img
                                    src="https://d2fc09gk1936lv.cloudfront.net/kbs/866x487/scf.static.kbs.co.kr/image/NBCONTENTSMYLOVEKBS/NBCONTENTSMYLOVEKBS_70000000398553_20220811_20220811145000_master_images_01.jpg"
                                    alt="이찬원"
                                  />
                                </li>
                              </ul>
                              <ul className="hoverImgPt">
                                <li className="num">5</li>
                                <li className="title">
                                  박서진, '살림남' 10kg이상 감량한 서진 왕자의
                                  다이어트 비결
                                </li>
                                <li className="thumb">
                                  <img
                                    src="https://image.xportsnews.com/contents/images/upload/article/2024/0124/mb_1706052857115155.jpg"
                                    alt="박서진"
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <div className="swiper-button-next"></div>{" "}
                      <div className="swiper-pagination"></div>
                      <div className="swiper-button-prev"></div>
                    </Swiper>
                  </div>
                </div>

                <div className="stickyTitle">실시간 인기기사</div>
                <div className="popularNewsRight">
                  {newsData.resents.slice(0, 5).map((recent, index) => (
                    <ul key={recent.newsId}>
                      <li>{index + 1}</li>
                      <li>
                        <Link
                          to={`/category/${categoryId}/news/${recent.newsId}`}
                        >
                          {recent.title}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/category/${categoryId}/news/${recent.newsId}`}
                        >
                          <img src={recent.thumbnail} alt={recent.title} />
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>

                <div className="stickyTitle">최신 기사</div>
                <div className="rtNewsRight">
                  {newsData.newsList.content.slice(0, 4).map((recent) => (
                    <ul key={recent.newsId}>
                      <Link
                        to={`/category/${categoryId}/news/${recent.newsId}`}
                      >
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
    </>
  );
}

export default CategoryPage;
