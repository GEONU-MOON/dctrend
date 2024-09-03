import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import logo from "../images/logo.svg";
import icoSearch from "../images/ico_search.svg";
import icoTicket from "../images/ico_ticket.png";

function Main() {
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
              <img src={logo} alt="logos" />
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
                  alt="Search Icon"
                />
              </div>
              <a>
                <img className="openSearch" src={icoSearch} alt="Open Search" />
              </a>
            </ul>
            <ul className="btn">
              <img src={icoTicket} alt="Ticket Icon" />
              투표권 구매
            </ul>
            <ul className="login">로그인</ul>
          </div>
          <div className="mo slideMenuOpen">
            <img src={icoSearch} alt="Menu Icon" />
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

      <section id="sticky" className="stickyWrap" style={{ display: "none" }}>
        <div className="inBox">
          <div className="logo">
            <img src="../images/logo.svg" alt="" />
          </div>
          <div className="menu">
            <ul className="on">트렌드 뉴스</ul>
            <ul>디시이슈</ul>
            <ul>디시인터뷰</ul>
          </div>
          <div className="pc">
            <ul className="search">
              <a>
                <img src="../images/ico_search.svg" alt="" />
              </a>
            </ul>
            <ul className="btn">
              <img src="../images/ico_ticket.png" alt="" />
              투표권 구매
            </ul>
            <ul className="login">로그인</ul>
          </div>
          <div className="mo slideMenuOpen">
            <img src="../images/btn_menu.svg" alt="" />
          </div>
        </div>
      </section>

      <section className="contentsWrap">
        <div className="trendNewsWrap">
          <div className="mainNews">
            <div className="main">
              <ul className="thumb hoverImgPt">
                <img
                  src="https://i.namu.wiki/i/Mo1K0sLg4_6x12SzbmI91tGP25zpDImV7JhYCXOOGzCUHa2kawoge4aV6EBu97uOHL4iWAYniZNKVfWafZGuDQ.webp"
                  alt=""
                />
              </ul>
              <ul className="head">헤드라인</ul>
              <ul className="title">
                보는 사람이 더 눈치...'전 남친' 던, 현아-용준형 결혼에도 커플
                사진 안 지웠다
              </ul>
              <ul className="txt">
                지난 8일 공개 열애를 이어오던 현아와 용준형의 결혼 소식이 전해진
                가운데, 현아의 SNS에 '전 남친' 던과의 흔적이 남아 있어 눈길을
                끌고 있다. 앞서 현아와 용준형은 지난 1월부터 공개 열애를
                이어오고 있다. 당시 양측 소속사는 "아티스트 사생활"이라는
                입장으로
              </ul>
              <ul className="mask"></ul>
            </div>
            <div className="sideNewsTitle">주요기사</div>
            <div className="sideNews">
              <ul className="hoverImgPt">
                <li className="thumb">
                  <img
                    src="https://flexible.img.hani.co.kr/flexible/normal/970/607/imgdb/original/2024/0725/20240725501006.jpg"
                    alt=""
                  />
                </li>
                <li className="title">
                  투애니원 완전체 다시 보나…YG 양현석과 8년 만에 회동
                </li>
                <li className="txt">
                  올해 데뷔 15주년을 맞은 걸그룹 투애니원(2NE1)의 네 멤버와
                  양현석 YG엔터테인먼트 총괄 프로듀서가 8년 만에 만났다.
                </li>
              </ul>
              <ul className="hoverImgPt">
                <li className="thumb">
                  <img
                    src="https://flexible.img.hani.co.kr/flexible/normal/681/409/imgdb/original/2024/0723/20240723501330.jpg"
                    alt=""
                  />
                </li>
                <li className="title">
                  벌금 1천만원 낼 뻔한 걸그룹…‘적십자 표장’ 옷 입었다가 표장’ 옷
                  입었다가 표장’ 옷 입었다가
                </li>
                <li className="txt">
                  걸그룹 (여자)아이들이 최근 한 음악 방송에서 입은 의상에 적십자
                  표장이 무단 사용됐다는 비판이 제기되자, 소속사가 사과했다.
                </li>
              </ul>
              <ul className="hoverImgPt">
                <li className="thumb">
                  <img
                    src="https://file2.nocutnews.co.kr/newsroom/image/2024/07/24/202407241227143621_0.jpg"
                    alt=""
                  />
                </li>
                <li className="title">
                  韓, 개막 전 25일 양궁·핸드볼로 파리 올림픽 스타트[파리올림픽]
                </li>
                <li className="txt">
                  양궁은 25일(한국시간) 오후 4시30분부터 프랑스 파리의
                  레쟁발리드에서 랭킹 라운드를 펼친다. 여자부 랭킹 라운드가 먼저
                  시작하고, 오후 9부15분부터는 남자부 랭킹 라운드가 진행된다.
                </li>
              </ul>
            </div>
            <div className="rtNewsTitle">최신 기사</div>
            <div className="rtNews">
              <ul className="hoverImgPt">
                <li className="thumb">
                  <img
                    src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201904/23/3ed3513a-77e1-4994-bff3-a5433920f76f.jpg"
                    alt=""
                  />
                </li>
                <li className="title">
                  US오픈 첫날, 셰플러·우즈 모두 부진…김성현은 공동 9위US오픈
                  첫날, 셰플러·우즈 모두 부진…김성현은 공동 9위
                </li>
                <li className="txt">
                  미국프로골프(PGA) 투어 US오픈(총상금 2150만 달러·약 294억원)가
                  개막한 가운데 유력한 우승 후보부터 돌아온 슈퍼스타까지 기대
                  이하의 성적으로 1라운드를 마쳤다.
                </li>
              </ul>
              <ul className="hoverImgPt">
                <li className="thumb">
                  <img
                    src="https://cdn.hankyung.com/photo/202406/01.37026696.1.jpg"
                    alt=""
                  />
                </li>
                <li className="title">
                  BTS 진 허그회에 등장한 기습 뽀뽀…'팬 사랑' 무색케 한 무례
                </li>
                <li className="txt">
                  그룹 방탄소년단(BTS) 맏형 진이 전역 바로 다음 날 개최한 대면
                  이벤트에서 진에게 기습 뽀뽀한 팬이 등장해 눈살을 찌푸리게 하고
                  있다.
                </li>
              </ul>
              <ul className="hoverImgPt">
                <li className="thumb">
                  <img
                    src="https://image.xportsnews.com/contents/images/upload/article/2024/07/24/mb_1716106571678771.jpeg"
                    alt=""
                  />
                </li>
                <li className="title">
                  韓, 개막 전 25일 양궁·핸드볼로 파리 올림픽 스타트[파리올림픽]
                </li>
                <li className="txt">
                  양궁은 25일(한국시간) 오후 4시30분부터 프랑스 파리의
                  레쟁발리드에서 랭킹 라운드를 펼친다. 여자부 랭킹 라운드가 먼저
                  시작하고, 오후 9부15분부터는 남자부 랭킹 라운드가 진행된다.
                </li>
              </ul>
            </div>
          </div>
          <div className="dcTrend">
            <div className="dcTitle">
              디시트렌드<div className="arw s24"></div>
            </div>
            <Swiper
              className="dcTrendRoll"
              direction="vertical"
              slidesPerView="auto"
              spaceBetween={0}
              breakpoints={{
                480: {
                  direction: "horizontal",
                  slidesPerView: "auto",
                  spaceBetween: 16,
                },
                1200: {
                  direction: "vertical",
                  slidesPerView: "auto",
                  spaceBetween: 0,
                },
              }}
            >
              <SwiperSlide>
                <ul className="hoverImgPt">
                  <li className="thumb">
                    <img
                      src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                      alt=""
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
                      alt=""
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
                      alt=""
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
          <div className="sectionTitle">
            <div className="title">실시간 랭킹 차트</div>
            <div className="more">
              랭킹뉴스 더보기<div className="arw s16"></div>
            </div>
          </div>
          <div className="inScrollRank">
            <div className="rankChart">
              <div className="rankBox">
                <div className="rankTitle">
                  아이돌 걸그룹 랭킹<div className="arw s24"></div>
                </div>
                <div className="box">
                  <div className="rank">
                    <Swiper
                      className="rankRoll"
                      direction="vertical"
                      slidesPerView={1}
                      spaceBetween={0}
                      loop={true}
                      autoplay={{ delay: 2000, disableOnInteraction: false }}
                    >
                      <SwiperSlide>
                        <ul>
                          <li className="num">1</li>
                          <li className="thumb">
                            <img
                              src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                              alt=""
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
                              alt=""
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
                              alt=""
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
                              alt=""
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
                              src="https://image.xportsnews.com/contents/images/upload/article/2024/0519/mb_1716106571678771.jpeg"
                              alt=""
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
                        혜인 합류…뉴진스 완전체 국내 음방 무대 선보인다
                      </li>
                      <li className="thumb">
                        <img
                          src="https://img.etoday.co.kr/pto_db/2024/06/600/20240608095743_2034978_1200_901.jpg"
                          alt=""
                        />
                      </li>
                    </ul>
                    <ul className="hoverImgPt">
                      <li className="num">2</li>
                      <li className="title">
                        에스파 '슈퍼노바', 스포티파이 1억 스트리밍 달성…통산
                        10번째
                      </li>
                      <li className="thumb">
                        <img
                          src="https://thumb.mt.co.kr/06/2024/07/2024071016194159841_1.jpg/dims/optimize/"
                          alt=""
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
                          alt=""
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
                          alt=""
                        />
                      </li>
                    </ul>
                    <ul className="hoverImgPt">
                      <li className="num">5</li>
                      <li className="title">
                        아일릿 원희, 목발 짚고 안쓰러운 日 출국…한쪽 팔로 짐까지
                        바리바리
                      </li>
                      <li className="thumb">
                        <img
                          src="https://image.xportsnews.com/contents/images/upload/article/2024/0519/mb_1716106571678771.jpeg"
                          alt=""
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sectionTitle">
            <div className="title">연예</div>
            <div className="more">
              연예뉴스 더보기<div className="arw s16"></div>
            </div>
          </div>
          <div className="newsCategory">
            <Swiper
              className="newsRoll"
              slidesPerView="auto"
              spaceBetween={16}
              breakpoints={{
                600: {
                  slidesPerView: "auto",
                  spaceBetween: 16,
                },
                1200: {
                  slidesPerView: "auto",
                  spaceBetween: 16,
                },
              }}
            >
              <SwiperSlide>
                <ul className="hoverImgPt">
                  <li className="thumb">
                    <img
                      src="https://t1.daumcdn.net/news/202407/12/tvreport/20240712180102350yakf.jpg"
                      alt=""
                    />
                  </li>
                  <li className="title">
                    이보영♥지성, 장동건♥고소영... '결혼 장려' 스타 부부들 근황
                  </li>
                  <li className="txt">
                    배우 고소영이 아이들 방학을 맞이해 가족 해외여행을 떠난
                    근황을 전했다.
                  </li>
                </ul>
              </SwiperSlide>
              <SwiperSlide>
                <ul className="hoverImgPt">
                  <li className="thumb">
                    <img
                      src="https://t1.daumcdn.net/news/202407/12/poctan/20240712155121530fdnp.jpg"
                      alt=""
                    />
                  </li>
                  <li className="title">
                    쯔양 "벌 거 다 벌고 떠나? 어떠한 이유 때문에"..4년 전 은퇴글
                    재조명
                  </li>
                  <li className="txt">
                    전 남자친구이자 소속사 대표에게 폭행 및 협박을 당하고 금전
                    갈취를 당했다고 밝힌 먹방 크리에이터 쯔양이 4년 전 작성한
                    은퇴글이 재조명되고 있다.
                  </li>
                </ul>
              </SwiperSlide>
              <SwiperSlide>
                <ul className="hoverImgPt">
                  <li className="thumb">
                    <img
                      src="https://news.nateimg.co.kr/orgImg/hm/2024/07/12/202407121641239256260_20240712165349_01.jpg"
                      alt=""
                    />
                  </li>
                  <li className="title">
                    카라 한승연, 나이를 안 먹네…어제 데뷔한 듯 러블리
                  </li>
                  <li className="txt">
                    12일 그룹 카라의 멤버 한승연은 SNS에 “여...여러분...? 나
                    사고친 것 같아.... come n meet me 에라이 저지르고 본다!!!!!
                    이제는 프롬에서도 만나아-”라고 적었다.
                  </li>
                </ul>
              </SwiperSlide>
              <SwiperSlide>
                <ul className="hoverImgPt">
                  <li className="thumb">
                    <img
                      src="https://news.nateimg.co.kr/orgImg/pt/2024/07/12/202407121721778969_6690ec076289f.jpg"
                      alt=""
                    />
                  </li>
                  <li className="title">
                    '뮤직뱅크' 뉴진스 혜인, 복귀 소감…"멤버들과 무대 할 수 있어
                    신나"
                  </li>
                  <li className="txt">
                    12일 방송된 KBS2 ‘뮤직뱅크’에는 뉴진스가 완전체로 출연했다.
                  </li>
                </ul>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="sectionTitle">
            <div className="title">스포츠</div>
            <div className="more">
              스포츠뉴스 더보기<div className="arw s16"></div>
            </div>
          </div>
          <div className="newsCategory">
            <Swiper
              className="newsRoll"
              slidesPerView="auto"
              spaceBetween={16}
              breakpoints={{
                600: {
                  slidesPerView: "auto",
                  spaceBetween: 16,
                },
                1200: {
                  slidesPerView: "auto",
                  spaceBetween: 16,
                },
              }}
            >
              <SwiperSlide>
                <ul className="hoverImgPt">
                  <li className="thumb">
                    <img
                      src="https://cdnweb01.wikitree.co.kr/webdata/editor/202407/13/img_20240713155537_5fdded8d.webp"
                      alt=""
                    />
                  </li>
                  <li className="title">
                    "홍명보, 거액 받고 가면서 '희생' 표현…반발 여론 많다" 서형욱
                    일침
                  </li>
                  <li className="txt">
                    축구 해설위원 서형욱이 대한민국 축구 대표팀 감독으로 홍명보
                    감독이 선임된 후 불거진 여러 논란에 대한 생각을 밝혔다.
                  </li>
                </ul>
              </SwiperSlide>
              <SwiperSlide>
                <ul className="hoverImgPt">
                  <li className="thumb">
                    <img
                      src="https://t1.daumcdn.net/news/202405/01/SPORTSSEOUL/20240501085014667oyts.jpg"
                      alt=""
                    />
                  </li>
                  <li className="title">
                    맨유 미쳤다! '네덜란드 3총사' 폭풍 영입…더
                    리흐트→지르크지→시몬스 '오렌지 커넥션'
                  </li>
                  <li className="txt">
                    맨체스터 유나이티드가 네덜란드 커넥션을 완성할 기세다.
                    마테이스 더 리흐트, 조슈아 지르크지에 이어 사비 시몬스까지
                    노린다.
                  </li>
                </ul>
              </SwiperSlide>
              <SwiperSlide>
                <ul className="hoverImgPt">
                  <li className="thumb">
                    <img
                      src="https://cdnweb01.wikitree.co.kr/webdata/editor/202407/12/img_20240712135340_3d7b45c6.webp"
                      alt=""
                    />
                  </li>
                  <li className="title">
                    박주호 연락두절?…도르트문트 감독 만났다→'축구판 민희진'
                    환하게 웃었다!
                  </li>
                  <li className="txt">
                    대한축구협회가 국가대표팀 감독 선임에 대한 박주호 국가대표
                    전력강화위원회 위원의 내부 고발을 놓고 법적 조치 초강수를
                    예고했다.
                  </li>
                </ul>
              </SwiperSlide>
              <SwiperSlide>
                <ul className="hoverImgPt">
                  <li className="thumb">
                    <img
                      src="https://www.francezone.com/xe/files/attach/images/131/566/408/002/5249825484d339f9b4c80e4db39438cd.jpg"
                      alt=""
                    />
                  </li>
                  <li className="title">
                    올림픽 개막 보름 전인데…파리 센강 대장균 기준치 10배
                  </li>
                  <li className="txt">
                    2024 파리 올림픽 개막이 보름 앞으로 다가왔지만 남녀
                    트라이애슬론 경기가 열릴 파리 센강의 대장균 수치가 비가 오면
                    최대 기준치의 10배에 달하는 것으로 나타났다.
                  </li>
                </ul>
              </SwiperSlide>
            </Swiper>
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
            <img src="../images/logo.svg" alt="" />
          </ul>
          <ul className="close">
            <img src="../images/btn_close.svg" alt="" />
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
              <img src="../images/ico_ticket.png" alt="" />
              투표권 구매
            </div>
          </div>
        </div>
        <div className="scroll">
          <div className="search">
            <img src="../images/ico_search_gray.svg" alt="" />
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
          <div className="menu news" style={{ display: "none" }}>
            <ul>
              <li>트렌드 뉴스</li>
              <li>
                <dl>전체</dl>
                <dl>랭킹뉴스</dl>
                <dl>연예·스포츠</dl>
              </li>
            </ul>
            <ul>
              <li>트렌드 뉴스</li>
              <li>
                <dl>전체</dl>
                <dl>시사</dl>
                <dl>경제</dl>
                <dl>사회</dl>
                <dl>문화</dl>
                <dl>IT</dl>
              </li>
            </ul>
            <ul>
              <li>
                트렌드 뉴스<div className="arw"></div>
              </li>
            </ul>
            <ul>
              <li>
                디시인터뷰<div className="arw"></div>
              </li>
            </ul>
          </div>
          <div className="menu rank">
            <ul>
              <li>
                연예인<div className="arw"></div>
              </li>
            </ul>
            <ul>
              <li>
                스포츠인<div className="arw"></div>
              </li>
            </ul>
            <ul>
              <li>
                유튜버<div className="arw"></div>
              </li>
            </ul>
            <ul>투표 모아보기</ul>
            <li>
              <dl>전체</dl>
              <dl>연예인</dl>
              <dl>유튜버</dl>
              <dl>스포츠인</dl>
            </li>
          </div>
        </div>
        <div className="logout">
          <div className="btn">
            <img src="../images/ico_logout.svg" alt="" />
            로그아웃
          </div>
        </div>
      </section>

      <section id="moveBtn" className="moveTop">
        <img src="../images/btn_top.svg" alt="" />
      </section>
    </div>
  );
}

export default Main;
