import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Radio, Space } from "antd";
import Swal from "sweetalert2";

function CommentNotify({ isOpen, onClose, id, type }) {
  const [list, setList] = useState(null);
  const [value, setValue] = useState(null);
  const [text, setText] = useState("");

  // 신고 버튼 클릭 시에만 신고 사유 목록을 불러오도록 수정
  useEffect(() => {
    if (isOpen) {
      const reasonsLoad = async () => {
        try {
          const response = await axios.get(
            "https://api.trend.rankify.best/api/v1/common/report-reasons",
            {
              headers: {
                "X-API-KEY": "AdswKr3yJ5lHkWllQUr6adnY9Q4aoqHh0KfwBeyb14",
              },
            }
          );
          setList(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      reasonsLoad();
    }
  }, [isOpen]); // isOpen이 true일 때만 실행

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleTextChange = (e) => {
    if (e.target.value.length <= 500) {
      setText(e.target.value);
    }
  };

  const handleNotifyConfirm = async (e) => {
    if (value === null) {
      Swal.fire({
        icon: "warning",
        text: "신고사유를 선택해주세요",
        confirmButtonText: "확인",
      });
      return;
    }
    if (value === 9999 && text.trim() === "") {
      Swal.fire({
        icon: "warning",
        text: "기타 신고사유를 작성해주세요",
        confirmButtonText: "확인",
      });
      return;
    }
    try {
      const url = `https://api.trend.rankify.best/api/v1/comments/report`;
      const params = {
        contentType: "NEWS",
        commentType: type,
        commentId: id,
        reportReason: value,
        reportDetails: text,
      };
      const response = await axios.post(url, params, {
        headers: {
          "X-API-KEY": "AdswKr3yJ5lHkWllQUr6adnY9Q4aoqHh0KfwBeyb14",
        },
      });
      if (response.data.message === "success") {
        Swal.fire({
          icon: "success",
          text: "신고접수가 완료되었습니다.",
          confirmButtonText: "확인",
        }).then(() => {
          setText("");
          onClose();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setText("");
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <section className="layerDefault notify">
      <div className="inbox">
        <div className="top">댓글 신고</div>
        <div className="close" onClick={handleClose}>
          <img
            src="https://cdn.trend.rankify.best/dctrend/front/images/btn_close_gray.svg"
            alt=""
          />
        </div>
        <div className="cont">
          <div className="commentNotify">
            <ul className="tit">신고 사유를 선택해주세요.</ul>
            <ul className="list">
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  {list?.map((item, index) => (
                    <Radio key={index} value={item.id}>
                      {item.reason}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
              <textarea
                placeholder="신고 사유를 작성해주세요"
                disabled={value !== 9999}
                value={text}
                onChange={handleTextChange}
              ></textarea>
              <div className="limit">{text.length}/500</div>
            </ul>
          </div>
        </div>
        <div className="bot">
          <ul className="cancel" onClick={handleClose}>
            취소
          </ul>
          <ul className="confirm" onClick={handleNotifyConfirm}>
            신고하기
          </ul>
        </div>
      </div>
    </section>,
    document.body
  );
}

export default CommentNotify;
