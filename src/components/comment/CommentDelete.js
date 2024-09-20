import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Swal from "sweetalert2";

function CommentDelete({ isOpen, onClose, isReset, id, txt, type }) {
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => setPassword(e.target.value);
  if (!isOpen) return null;

  const handleDeleteConfirm = async (e) => {
    if (!password) {
      Swal.fire({
        icon: "info",
        text: "비밀번호를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return;
    }
    try {
      const url = `https://api.trend.rankify.best/api/v1/comments/news/delete`;
      const params = {
        id: id,
        type: type,
        password: password,
      };
      const response = await axios.post(url, params, {
        headers: {
          "X-API-KEY": "AdswKr3yJ5lHkWllQUr6adnY9Q4aoqHh0KfwBeyb14",
        },
      });
      if (isReset && response.data.message === "success") isReset(); // 댓글 삭제 후 콜백 호출
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDOM.createPortal(
    <section className="layerDefault commentDelete">
      <div className="inbox">
        <div className="top">댓글 삭제</div>
        <div className="close" onClick={onClose}>
          <img
            src="https://cdn.trend.rankify.best/dctrend/front/images/btn_close_gray.svg"
            alt=""
          />
        </div>
        <div className="cont">
          <div className="commentPassword">
            <ul className="tit">작성자만 글을 삭제할 수 있습니다.</ul>
            <ul className="txt">
              글 작성시 입력한 비밀번호를 입력하여
              <br />
              글을 삭제할 수 있습니다.
            </ul>
            <ul className="inp">
              <img
                src="https://cdn.trend.rankify.best/dctrend/front/images/ico_password.svg"
                alt=""
              />
              <input
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange={handlePasswordChange}
              />
            </ul>
          </div>
        </div>
        <div className="bot">
          <ul className="cancel" onClick={onClose}>
            취소
          </ul>
          <ul className="confirm" onClick={handleDeleteConfirm}>
            확인
          </ul>
        </div>
      </div>
    </section>,
    document.body
  );
}

export default CommentDelete;
