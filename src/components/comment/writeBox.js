import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function WriteBox({
  contentsId,
  commentId,
  saveType,
  isReset,
  state = "ACTIVE",
}) {
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 값 불러오기
  useEffect(() => {
    const savedNick = localStorage.getItem("nick");
    const savedPassword = localStorage.getItem("password");
    if (savedNick) setNick(savedNick);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const saveComment = async () => {
    try {
      const url = `https://api.trend.rankify.best/v1/comments/news/save`;
      const params = {
        comment: text,
        nickName: nick,
        password: password,
        type: saveType,
        contentId: contentsId,
      };

      if (saveType === "REPLY") {
        params.parentCommentId = commentId;
      }

      console.log("Sending comment data:", params);

      await axios.post(url, params, {
        headers: {
          "X-API-KEY": "AdswKr3yJ5lHkWllQUr6adnY9Q4aoqHh0KfwBeyb14",
        },
      });

      setText("");

      if (isReset) isReset();
    } catch (error) {
      console.error("Error saving comment:", error);
      Swal.fire({
        icon: "error",
        text: "댓글 저장에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  const handleNickChange = (e) => setNick(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setText(value);
    }
  };

  const handleSubmit = () => {
    // 필수값 확인
    if (!nick || !password || !text) {
      Swal.fire({
        icon: "info",
        text: "닉네임, 비밀번호, 그리고 댓글을 입력해주세요.",
      });
      return;
    }

    // 로컬 스토리지에 닉네임과 비밀번호 저장
    localStorage.setItem("nick", nick);
    localStorage.setItem("password", password);

    // 댓글 저장 함수 호출
    saveComment();
  };

  return (
    <>
      {state !== "INACTIVE" && (
        <div className="writeBox">
          <div className="loginFalse">
            <input
              name="nick"
              type="text"
              placeholder="닉네임"
              value={nick}
              maxLength="10"
              onChange={handleNickChange}
            />
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="textareaBox">
            <textarea
              placeholder={`타인의 권리를 침해하거나 비하하는 댓글은 허용되지 않으며, 위반 시 삭제 및 제재될 수 있습니다.\n건전한 토론 문화를 위해 협조 부탁드립니다.`}
              value={text}
              onChange={handleTextChange}
            ></textarea>
            <div className="bot">
              <ul className="limit">{text.length}/500</ul>
              <button disabled={text.length === 0} onClick={handleSubmit}>
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WriteBox;
