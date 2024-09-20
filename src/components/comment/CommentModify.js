import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Swal from "sweetalert2";

function CommentModify({ isOpen, onClose, isReset, id, txt, type }) {
  const [showPasswordInput, setShowPasswordInput] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [commentText, setCommentText] = useState(txt);
  const maxLength = 500;
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => setPassword(e.target.value);
  if (!isOpen) return null;

  const handlePasswordCheck = async (e) => {
    if (!password) {
      Swal.fire({
        icon: "info",
        text: "비밀번호를 입력해주세요.",
      });
      return;
    }
    try {
      const url = `https://api.trend.rankify.best/api/v1/comments/news/cofirm-password`;
      const params = {
        id: id,
        type: type,
        password: password,
      };

      console.log("Password check URL:", url);
      console.log("Password check params:", params);

      const response = await axios.post(url, params, {
        headers: {
          "X-API-KEY": "AdswKr3yJ5lHkWllQUr6adnY9Q4aoqHh0KfwBeyb14",
        },
      });

      console.log("Password check response:", response);

      if (isReset && response.data.message === "success") {
        setShowPasswordInput(false);
        setShowEdit(true);
      } else {
        console.log("Password check failed:", response.data);
      }
    } catch (error) {
      console.log("Error during password check:", error);
    }
  };

  const handleModifyConfirm = async (e) => {
    if (!commentText) {
      Swal.fire({
        icon: "info",
        text: "내용을 입력해주세요.",
      });
      return;
    }
    if (commentText === txt) {
      Swal.fire({
        icon: "info",
        text: "변경된 내용이 없습니다.",
      });
      return;
    }
    try {
      const url = `https://api.trend.rankify.best/api/v1/comments/news/update`;
      const params = {
        id: id,
        type: type,
        comment: commentText,
        password: password,
      };

      console.log("Modify confirm URL:", url);
      console.log("Modify confirm params:", params);

      const response = await axios.post(url, params, {
        headers: {
          "X-API-KEY": "AdswKr3yJ5lHkWllQUr6adnY9Q4aoqHh0KfwBeyb14",
        },
      });

      console.log("Modify confirm response:", response);

      if (isReset && response.data.message === "success") {
        isReset(); // 댓글 수정 후 콜백 호출
      } else {
        console.log("Modify failed:", response.data);
      }
    } catch (error) {
      console.log("Error during modify confirm:", error);
    }
  };

  const handleCancel = () => {
    setShowPasswordInput(true);
    setShowEdit(false);
    onClose();
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setCommentText(newText);
    }
  };

  return ReactDOM.createPortal(
    <section className="layerDefault commentModify">
      <div className="inbox">
        <div className="top">댓글 수정</div>
        <div className="close" onClick={handleCancel}>
          <img
            src="https://cdn.trend.rankify.best/dctrend/front/images/btn_close_gray.svg"
            alt="Close"
          />
        </div>
        {showPasswordInput && (
          <div className="cont">
            <div className="commentPassword">
              <ul className="tit">작성자만 글을 수정할 수 있습니다.</ul>
              <ul className="txt">
                글 작성시 입력한 비밀번호를 입력하여
                <br />
                글을 수정할 수 있습니다.
              </ul>
              <ul className="inp">
                <img
                  src="https://cdn.trend.rankify.best/dctrend/front/images/ico_password.svg"
                  alt="Password"
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
        )}
        {showEdit && (
          <div className="cont">
            <div className="commentModifyIn">
              <textarea
                placeholder={`타인의 권리를 침해하거나 비하하는 댓글은 허용되지 않으며, 위반 시 삭제 및 제재될 수 있습니다.\n건전한 토론 문화를 위해 협조 부탁드립니다`}
                value={commentText}
                onChange={handleChange}
                name="comment"
              >
                {commentText}
              </textarea>
              <div className="limit">
                {commentText.length}/{maxLength}
              </div>
            </div>
          </div>
        )}
        <div className="bot">
          <ul className="cancel" onClick={handleCancel}>
            취소
          </ul>
          {showPasswordInput && (
            <ul className="confirm" onClick={handlePasswordCheck}>
              확인
            </ul>
          )}
          {showEdit && (
            <ul className="confirm" onClick={handleModifyConfirm}>
              수정하기
            </ul>
          )}
        </div>
      </div>
    </section>,
    document.body
  );
}

export default CommentModify;
