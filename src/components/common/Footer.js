import React from "react";

function Footer() {
  return (
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
        문제가 발생하면 <span>피드백 센터</span>를 통해 신고해 주시기 바랍니다.
      </ul>
    </section>
  );
}

export default Footer;
