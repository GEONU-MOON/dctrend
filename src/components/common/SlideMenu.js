import React from "react";
import logo from "../../images/logo.svg";
import icoSearch from "../../images/ico_search.svg";
import icoTicket from "../../images/ico_ticket.png";
import close from "../../images/btn_close.svg";
import logout from "../../images/ico_logout.svg";

function SlideMenu({ isOpen, toggleMenu }) {
  return (
    <section className={`slideMenu ${isOpen ? "on" : ""}`}>
      <div className="top">
        <ul className="logo">
          <img src={logo} alt="logo" />
        </ul>
        <ul className="close" onClick={toggleMenu}>
          <img src={close} alt="close button" />
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
          <img src={icoSearch} alt="search icon" />
          <input name="search" type="text" placeholder="검색어를 입력하세요" />
        </div>
        <div className="tab">
          <ul className="on">뉴스</ul>
          <ul>랭킹</ul>
        </div>
        <div className="menu news">
          <ul>
            <li>트렌드 뉴스</li>
            <li>
              <dl>전체</dl>
              <dl>랭킹뉴스</dl>
              <dl>연예·스포츠</dl>
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
        </div>
      </div>
      <div className="logout">
        <div className="btn">
          <img src={logout} alt="logout icon" />
          로그아웃
        </div>
      </div>
    </section>
  );
}

export default SlideMenu;
