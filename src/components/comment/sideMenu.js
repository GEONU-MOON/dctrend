import React, { useState, useEffect, useRef } from "react";
import CommentDelete from "./CommentDelete";
import CommentNotify from "./CommentNotify";
import CommentModify from "./CommentModify";

function SideMenuBox({ isReset, id, txt, type, state }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const openModify = () => setIsModifyOpen(true);
  const closeModify = () => setIsModifyOpen(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const openDelete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);

  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const openNotify = () => setIsNotifyOpen(true);
  const closeNotify = () => setIsNotifyOpen(false);

  // menuLayer 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // state가 "INACTIVE"가 아닐 때만 렌더링
  return (
    <>
      {state !== "INACTIVE" && (
        <li className="menu">
          <img
            src="https://cdn.trend.rankify.best/dctrend/front/images/btn_sidemenu.svg"
            alt=""
            onClick={toggleMenu}
            style={{ cursor: "pointer" }}
          />
          {isMenuOpen && (
            <div className="menuLayer" ref={menuRef}>
              <div className="btn modify" onClick={openModify}>
                수정
              </div>
              <div className="btn delete" onClick={openDelete}>
                삭제
              </div>
              <div className="btn notify" onClick={openNotify}>
                신고
              </div>
            </div>
          )}
        </li>
      )}
      <CommentModify
        isOpen={isModifyOpen}
        onClose={closeModify}
        isReset={isReset}
        id={id}
        txt={txt}
        type={type}
      />
      <CommentDelete
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        isReset={isReset}
        id={id}
        txt={txt}
        type={type}
      />
      <CommentNotify
        isOpen={isNotifyOpen}
        onClose={closeNotify}
        id={id}
        type={type}
      />
    </>
  );
}

export default SideMenuBox;
