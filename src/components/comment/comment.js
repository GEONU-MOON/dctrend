import React, { useEffect, useState } from "react";
import axios from "axios";
import WriteBox from "./writeBox";
import VoteBox from "./voteBox";
import { formatDateKr } from "../../hooks/useFormatDate";

function CommentWrap(props) {
  const apiUrl = "https://api.trend.rankify.best/";
  const [comment, setComment] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [showDep2, setShowDep2] = useState({});

  const fetchComment = async (page, sort, reset = false) => {
    try {
      const url = `${apiUrl}api/v1/comments/news?entityId=${props.id}&page=${page}&size=10&sort=${sort}`;
      console.log("Request URL: ", url);
      const response = await axios.get(url, {
        headers: {
          "X-API-KEY": "AdswKr3yJ5lHkWllQUr6adnY9Q4aoqHh0KfwBeyb14",
        },
      });

      const data = response.data;
      console.log("API Response:", data); // 응답 데이터 확인

      if (data && data.data && data.data.content) {
        const { content, metadata } = data.data;
        setMetaData(metadata);

        // 새 페이지 데이터를 불러올 때, 초기화 여부에 따라 처리
        if (reset) {
          setComment(content); // 초기화 후 새로운 댓글 저장
        } else {
          setComment((prevItems) => [...prevItems, ...content]); // 기존 댓글 유지 후 추가
        }

        // 현재 페이지가 마지막 페이지인 경우 더 불러올 수 없도록 설정
        if (metadata.currentPage === metadata.totalPages) {
          setHasMore(false); // 더 이상 페이지가 없으므로 hasMore를 false로 설정
        } else {
          setHasMore(true); // 아직 더 불러올 페이지가 있으면 true로 유지
        }
      }
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 처음 마운트되었을 때 댓글을 초기화하고 가져옴
    fetchComment(1, sort, true);
  }, [props.id, sort]); // 의존성 배열에서 불필요한 값 제거

  // 댓글 더 불러오기
  const loadMore = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchComment(nextPage, sort, false); // 기존 댓글 유지하면서 더 불러옴
    }
  };

  // 답글 토글
  const handleReplyClick = (index) => {
    setShowDep2((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // 댓글 초기화
  const commentReset = () => {
    setComment([]); // 기존 댓글 목록을 지웁니다.
    setPage(1); // 페이지 번호를 1로 초기화합니다.
    fetchComment(1, sort, true); // 페이지 1로 초기화
  };

  // 정렬 변경
  const handleSortChange = (newSort) => {
    setPage(1); // 페이지 번호 초기화
    fetchComment(1, newSort, true); // 기존 댓글 초기화 후 새로 불러옴
    setSort(newSort); // 새로운 sort 값 설정
  };

  return (
    <>
      <div className="commentWrap">
        {/* metaData가 있을 때만 totalCounts를 렌더링 */}
        <div className="totalCnt">
          댓글 {metaData ? metaData.totalCounts : 0}
        </div>
        <WriteBox
          contentsId={props.id}
          commentId={null}
          saveType="COMMENT"
          isReset={commentReset}
        />
        <div className="tab">
          <ul
            className={sort === "" ? "on" : ""}
            onClick={() => handleSortChange("")}
          >
            최신순
          </ul>
          <ul
            className={sort === "likeCount,desc" ? "on" : ""}
            onClick={() => handleSortChange("likeCount,desc")}
          >
            추천순
          </ul>
          <ul
            className={sort === "replyCount,desc" ? "on" : ""}
            onClick={() => handleSortChange("replyCount,desc")}
          >
            답글순
          </ul>
        </div>
        <div className="commentList">
          {metaData && metaData.totalCounts > 0 ? (
            comment.map((comment, index) => (
              <ul key={index} className="list">
                <div className="dep1">
                  <li className="info">
                    <dl className="name">{comment.nickName}</dl>
                    <dl className="date">{formatDateKr(comment.createdAt)}</dl>
                  </li>
                  <li
                    className={`cont ${
                      comment.status === "INACTIVE" ? "block" : ""
                    }`}
                  >
                    {comment.comment}
                  </li>
                  <li className="reply" onClick={() => handleReplyClick(index)}>
                    답글<span>{comment.commentReplies.length}</span>
                    <div
                      className={`arw s16 ${showDep2[index] ? "open" : ""}`}
                    ></div>
                  </li>
                  <VoteBox
                    initialGood={comment.likeCount}
                    initialBad={comment.dislikeCount}
                    id={comment.id}
                    type="COMMENT"
                    state={comment.status}
                  />
                  {console.log(
                    "LikeCount:",
                    comment.likeCount,
                    "DislikeCount:",
                    comment.dislikeCount
                  )}
                </div>
                {showDep2[index] && (
                  <div className="dep2">
                    {comment.commentReplies.length > 0 ? (
                      comment.commentReplies.map((reply, replyIndex) => (
                        <div className="inList" key={replyIndex}>
                          <li className="info">
                            <dl className="name">{reply.nickName}</dl>
                            <dl className="date">
                              {formatDateKr(reply.createdAt)}
                            </dl>
                          </li>
                          <li
                            className={`cont ${
                              reply.status === "INACTIVE" ? "block" : ""
                            }`}
                          >
                            {reply.comment}
                          </li>
                          <VoteBox
                            initialGood={reply.likeCount}
                            initialBad={reply.dislikeCount}
                            id={reply.id}
                            type="REPLY"
                            state={reply.status}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="noReplies">등록된 답글이 없습니다.</div>
                    )}
                    <WriteBox
                      contentsId={props.id}
                      commentId={comment.id}
                      saveType="REPLY"
                      isReset={commentReset}
                      state={comment.status}
                    />
                    <div className="replyClose">
                      <div
                        className="in"
                        onClick={() => handleReplyClick(index)}
                      >
                        답글 접기<div className="arw s16"></div>
                      </div>
                    </div>
                  </div>
                )}
              </ul>
            ))
          ) : (
            <div className="noComment">등록된 댓글이 없습니다.</div>
          )}
        </div>
        {hasMore && metaData && metaData.totalCounts > 0 && (
          <div className="btnMore">
            <div className="in" onClick={loadMore}>
              댓글더보기<div className="arw"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CommentWrap;
