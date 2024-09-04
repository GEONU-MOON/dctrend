import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import icoSearch from "../../images/ico_search.svg";
import icoTicket from "../../images/ico_ticket.png";

function Header({ categories }) {
  return (
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
              <img className="clickSearch" src={icoSearch} alt="search icon" />
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
  );
}

export default Header;
