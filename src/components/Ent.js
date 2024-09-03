import React from "react";
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

function Ent() {
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
            <a href="../main/main.html">
              <img src={logo} alt="logo" />
            </a>
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
              <a href="../search/search.html">
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
              <a href="../main/main.html">
                <dl className="on">트렌드 뉴스</dl>
              </a>
              <a href="../issue/main.html">
                <dl>디시이슈</dl>
              </a>
              <a href="../interview/main.html">
                <dl>디시인터뷰</dl>
              </a>
            </li>
          </ul>
          <ul className="dep2">
            <li className="menu">
              <dl className="on">
                <Link to="/">
                  <dt>전체</dt>
                </Link>

                <a href="../main/rank.html">
                  <dt>랭킹뉴스</dt>
                </a>
                <a href="../main/ent.html">
                  <dt className="on">연예</dt>
                </a>
                <a href="../main/ent.html">
                  <dt>스포츠</dt>
                </a>
                <a href="../main/ent.html">
                  <dt>시사</dt>
                </a>
                <a href="../main/ent.html">
                  <dt>경제</dt>
                </a>
                <a href="../main/ent.html">
                  <dt>사회</dt>
                </a>
                <a href="../main/ent.html">
                  <dt>문화</dt>
                </a>
                <a href="../main/ent.html">
                  <dt>IT</dt>
                </a>
              </dl>
            </li>
          </ul>
        </div>
      </section>

      <section id="sticky" className="stickyWrap" style={{ display: "none" }}>
        <div className="inBox">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="menu">
            <ul className="on">트렌드 뉴스</ul>
            <ul>디시이슈</ul>
            <ul>디시인터뷰</ul>
          </div>
          <div className="pc">
            <ul className="search">
              <a href="../main/main.html">
                <img src={icoSearch} alt="search icon" />
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
      </section>

      <section className="contentsWrap">
        <div className="newsLayout">
          <div className="leftWrap">
            <div className="newsList">
              <div className="list">
                <ul className="hoverImgPt" onClick={() => {}}>
                  <div className="thumb">
                    <img
                      src="https://img.sportsworldi.com/content/image/2024/07/09/20240709503590.jpg"
                      alt=""
                    />
                  </div>
                  <li className="tit">
                    활동 중단했던 리아 복귀…있지, 하반기 완전체 앨범 발매
                  </li>
                  <li className="txt">
                    JYP엔터테인먼트는 지난 8일 오후 공식 SNS 채널을 통해 ITZY
                    리아의 복귀 소식을 알렸다. 이에 따르면 리아는 하반기 발매
                    예정인 ITZY의 새 앨범을 시작으로 본격적인 활동에 임할
                    예정이다.
                  </li>
                  <li className="info">스포츠월드</li>
                </ul>
                <ul className="hoverImgPt" onClick={() => {}}>
                  <div className="thumb">
                    <img
                      src="https://thumb.mtstarnews.com/06/2024/07/2024071816474659725_1.jpg/dims/optimize/"
                      alt=""
                    />
                  </div>
                  <li className="tit">
                    '여장한' 조정석, 女 속옷 입고 하이힐 질주.."배우의 숙명이죠"
                  </li>
                  <li className="txt">
                    배우 조정석이 '파격 변신'을 앞세워 코미디의 '정석'을
                    보여줬다. 영화 '파일럿'을 통해 원톱 주연으로 나선
                    조정석에게는 부담감도, 어려움도 없었다. '역시'라는 감탄이
                    절로 나올 정도로 자신의 진가를 발휘하는 조정석이다.
                  </li>
                  <li className="info">스포츠월드</li>
                </ul>
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
                    pagination={{ el: ".swiper-pagination" }}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
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
                              loop={true}
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
                                에스파 '슈퍼노바', 스포티파이 1억 스트리밍
                                달성…통산 10번째
                              </li>
                              <li className="thumb">
                                <img
                                  src="https://thumb.mt.co.kr/06/2024/07/2024071016194159841_1.jpg/dims/optimize/"
                                  alt=""
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-pagination"></div>
                </div>
                <div className="stickyTitle">실시간 인기기사</div>
                <div className="popularNewsRight">
                  <ul>
                    <li>1</li>
                    <li>조승우, 조정석에 "네가 뭔데 아이유랑 드라마" 버럭</li>
                    <li>
                      <img
                        src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1q8FPR.img?w=650&h=360&m=6&x=361&y=86&s=125&d=125"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="stickyTitle">최신 기사</div>
              <div className="rtNewsRight">
                <ul>
                  <li>
                    <img
                      src="https://dispatch.cdnser.be/cms-content/uploads/2024/07/25/c31cc2dc-fb84-4331-915d-b0e3bd1f0593.jpg"
                      alt=""
                    />
                  </li>
                  <li>'위키드', 11월 20일에 본다…韓서, 전 세계 최초 개봉</li>
                </ul>
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

export default Ent;
