import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../css/common.css";
import "../../css/layout.css";
import share from "../../images/btn_share.svg";
import fontsize from "../../images/btn_fontsize.svg";
import useCopyUrl from "../../hooks/useCopyUrl";
import useKakaoShare from "../../hooks/useKakaoShare";
import WriteBox from "../comment/writeBox";

function NewsDetailPage() {
  const { categoryId, newsId } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);
  const [emotions, setEmotions] = useState([]);
  const [clickedEmotions, setClickedEmotions] = useState([]);
  const [recents, setRecents] = useState([]);
  const [comment, setComment] = useState("");
  const [charCount, setCharCount] = useState(0);

  const copyUrlToClipboard = useCopyUrl();
  const shareToKakao = useKakaoShare();

  const [selectedFontSize, setSelectedFontSize] = useState("ftSz18");

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFontSizeModalOpen, setIsFontSizeModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.trend.rankify.best/api/v1/news/${categoryId}/${newsId}?popularNews=10`,
        {
          headers: {
            "X-API-KEY": "AdswKr3yJ5lHkWllQUr6adnY9Q4aoqHh0KfwBeyb14",
          },
        }
      )
      .then((response) => {
        if (response.data.message === "success") {
          setNewsDetail(response.data.data.newsDeatil);
          setEmotions(response.data.data.emotions);
          setRecents(response.data.data.resents);
        }
      })
      .catch((error) => {
        console.error("Error fetching news details:", error);
      });
  }, [categoryId, newsId]);

  if (!newsDetail) {
    return <div>Loading...</div>;
  }

  const handleCommentChange = (e) => {
    const text = e.target.value;
    setComment(text);
    setCharCount(text.length);
  };

  const handleEmotionClick = (emotionType) => {
    setEmotions((prevEmotions) =>
      prevEmotions.map((emotion) => {
        if (emotion.emotionType === emotionType) {
          const isClicked = clickedEmotions[emotionType];
          return {
            ...emotion,
            count: isClicked ? emotion.count - 1 : emotion.count + 1,
          };
        }
        return emotion;
      })
    );

    setClickedEmotions((prevClicked) => ({
      ...prevClicked,
      [emotionType]: !prevClicked[emotionType],
    }));
  };

  // 글자 크기 변경 함수
  const changeFontSize = (size) => {
    setSelectedFontSize(size);
    setIsFontSizeModalOpen(false); // 글자 크기 모달 닫기
  };

  // 모달 열기 및 닫기 함수
  const openShareModal = () => {
    setIsShareModalOpen(true);
    setIsFontSizeModalOpen(false); // 다른 모달 닫기
  };

  const openFontSizeModal = () => {
    setIsFontSizeModalOpen(true);
    setIsShareModalOpen(false); // 다른 모달 닫기
  };

  const closeModals = () => {
    setIsShareModalOpen(false);
    setIsFontSizeModalOpen(false);
  };

  return (
    <div>
      <section
        id="sticky"
        className="stickyArticleWrap"
        style={{ display: "none" }}
      >
        <div className="inBox">
          <div className="logo">
            <img src="../images/logo.svg" alt="" />
          </div>
          <div className="articleTitle">{newsDetail.title}</div>
          <div className="pc">
            <ul className="search">
              <a href="../main/main.html">
                <img src="../images/ico_search.svg" alt="" />
              </a>
            </ul>
            <ul className="btn">
              <img src="../images/ico_ticket.png" alt="" />
              투표권 구매
            </ul>
            <ul className="login">로그인</ul>
          </div>
          <div className="mo">
            <img src="../../images/btn_share.svg" alt="" />
            <img src="../../images/btn_fontsize.svg" alt="" />
          </div>
        </div>
        <div className="scrollProcess" style={{ width: "50%" }}></div>
      </section>

      <section className="contentsWrap">
        <div className="newsLayout">
          <div className="leftWrap">
            <div className="articleWrap">
              <div className="category ftSz16">{newsDetail.categoryName}</div>
              <div className="articleTitle ftSz36">{newsDetail.title}</div>
              <div className="info">
                <ul className="publisher">{newsDetail.authors}</ul>
                <ul className="date">
                  입력 {new Date(newsDetail.publishedAt).toLocaleString()}
                </ul>
                <ul className="btn">
                  <img src={share} alt="" onClick={openShareModal} />
                  <img src={fontsize} alt="" onClick={openFontSizeModal} />
                </ul>
              </div>
              <div className="layerBox">
                {isShareModalOpen && (
                  <div className="box share">
                    <div className="tit">공유</div>
                    <div className="close" onClick={closeModals}>
                      <img
                        src="https://cdn.trend.rankify.best/dctrend/front/images/btn_close_gray.svg"
                        alt="close"
                      />
                    </div>
                    <div className="cont">
                      <ul onClick={copyUrlToClipboard}>
                        <li>
                          <div className="icoUrl"></div>
                        </li>
                        <li>URL복사</li>
                      </ul>
                      <ul
                        onClick={() => {
                          shareToKakao(
                            newsDetail.title,
                            newsDetail.link ||
                              "이 뉴스의 자세한 내용을 확인하세요.",
                            newsDetail.thumbnail || "기본 이미지 URL",
                            window.location.href
                          );
                        }}
                      >
                        <li>
                          <div className="icoKakao"></div>
                        </li>
                        <li>카카오톡</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* 글자 크기 모달 */}
                {isFontSizeModalOpen && (
                  <div className="box font">
                    <div className="tit">글자 크기 설정</div>
                    <div className="close" onClick={closeModals}>
                      <img
                        src="https://cdn.trend.rankify.best/dctrend/front/images/btn_close_gray.svg"
                        alt="close"
                      />
                    </div>
                    <div className="cont">
                      <ul
                        className={selectedFontSize === "ftSz16" ? "on" : ""}
                        onClick={() => changeFontSize("ftSz16")}
                      >
                        <li>가</li>
                        <li>작게</li>
                      </ul>
                      <ul
                        className={selectedFontSize === "ftSz18" ? "on" : ""}
                        onClick={() => changeFontSize("ftSz18")}
                      >
                        <li>가</li>
                        <li>보통</li>
                      </ul>
                      <ul
                        className={selectedFontSize === "ftSz20" ? "on" : ""}
                        onClick={() => changeFontSize("ftSz20")}
                      >
                        <li>가</li>
                        <li>크게</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="contents">
                <div className={`break-words content ${selectedFontSize}`}>
                  <div
                    dangerouslySetInnerHTML={{ __html: newsDetail.content }}
                  />
                </div>
              </div>
              <div className="publisherBot">{newsDetail.authors} 기자</div>
              <div className="tag">
                {newsDetail.keywords &&
                  newsDetail.keywords.map((keyword, index) => (
                    <ul key={index}>#{keyword}</ul>
                  ))}
              </div>
            </div>
            <div className="sectionTitleSub">
              <div className="title">실시간 랭킹 차트</div>
              <div className="more">
                랭킹 더보기<div className="arw s16"></div>
              </div>
            </div>
            <div className="keywordRank">
              <div className="result">
                <Swiper
                  className="keywordResult"
                  slidesPerView="auto"
                  spaceBetween={16}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  modules={[Navigation]}
                >
                  <SwiperSlide>
                    <ul>
                      <li className="thumb">
                        <img
                          src="https://images.khan.co.kr/article/2021/11/15/l_2021111502000877900178361.jpg"
                          alt="안유진"
                        />
                      </li>
                      <li className="info">
                        <dl className="rank up">1위</dl>
                        <dl className="name">안유진</dl>
                      </li>
                      <li className="cate">아이브</li>
                      <li className="vote">4,224표</li>
                      <li className="btn">투표</li>
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <li className="thumb">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOdSSercqwddDwQ7i0DnMCfZJS7iF-7T4uAQ&s"
                          alt="카리나"
                        />
                      </li>
                      <li className="info">
                        <dl className="rank same">2위</dl>
                        <dl className="name">카리나</dl>
                      </li>
                      <li className="cate">에스파</li>
                      <li className="vote">4,224표</li>
                      <li className="btn">투표</li>
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <li className="thumb">
                        <img
                          src="https://news.nateimg.co.kr/orgImg/mk/2023/04/14/news-p.v1.20230414.15e6ac6d76a84ab398281046dc858116_P1.jpg"
                          alt="제니"
                        />
                      </li>
                      <li className="info">
                        <dl className="rank same">3위</dl>
                        <dl className="name">제니</dl>
                      </li>
                      <li className="cate">블랙핑크</li>
                      <li className="vote">4,224표</li>
                      <li className="btn">투표</li>
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <li className="thumb">
                        <img
                          src="https://i.namu.wiki/i/pWjwjQ8g8PHy37F-IQvM0qmUH6-NhCH0mLeMGrBArerxV_eATwJT_7rgdHcUhWZrRWG-TF7nMY7BiD0YSu5Tbg.webp"
                          alt="하니"
                        />
                      </li>
                      <li className="info">
                        <dl className="rank same">4위</dl>
                        <dl className="name">하니</dl>
                      </li>
                      <li className="cate">뉴진스</li>
                      <li className="vote">4,224표</li>
                      <li className="btn">투표</li>
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <li className="thumb">
                        <img
                          src="https://cdn.stardailynews.co.kr/news/photo/202403/440426_459339_3331.jpg"
                          alt="장원영"
                        />
                      </li>
                      <li className="info">
                        <dl className="rank same">5위</dl>
                        <dl className="name">장원영</dl>
                      </li>
                      <li className="cate">아이브</li>
                      <li className="vote">4,224표</li>
                      <li className="btn">투표</li>
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <li className="thumb">
                        <img
                          src="https://www.biztribune.co.kr/news/photo/201903/202889_53060_2944.jpg"
                          alt="아이린"
                        />
                      </li>
                      <li className="info">
                        <dl className="rank same">6위</dl>
                        <dl className="name">아이린</dl>
                      </li>
                      <li className="cate">레드벨벳</li>
                      <li className="vote">4,224표</li>
                      <li className="btn">투표</li>
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <li className="thumb">
                        <img
                          src="https://yt3.googleusercontent.com/_f3q_MahOBcj6xFmGjOVj0cQa57-TEm_oONad89YZGnmJqLRzVvPh0U71loMN2O3uHLs4su9Wg=s900-c-k-c0x00ffffff-no-rj"
                          alt="설현"
                        />
                      </li>
                      <li className="info">
                        <dl className="rank same">7위</dl>
                        <dl className="name">설현</dl>
                      </li>
                      <li className="cate">AOA</li>
                      <li className="vote">4,224표</li>
                      <li className="btn">투표</li>
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <li className="thumb">
                        <img
                          src="https://entertainimg.kbsmedia.co.kr/cms/uploads/PERSON_20230203085950_b66e8c930af1aa131737caf32ab3b884.jpg"
                          alt="미미"
                        />
                      </li>
                      <li className="info">
                        <dl className="rank same">8위</dl>
                        <dl className="name">미미</dl>
                      </li>
                      <li className="cate">오마이걸</li>
                      <li className="vote">4,224표</li>
                      <li className="btn">투표</li>
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <li className="thumb">
                        <img
                          src="https://wimg.mk.co.kr/news/cms/202401/16/news-p.v1.20240116.bbda7ab732c844ae9270e10b16592d4a_P1.jpeg"
                          alt="민지"
                        />
                      </li>
                      <li className="info">
                        <dl className="rank same">9위</dl>
                        <dl className="name">민지</dl>
                      </li>
                      <li className="cate">뉴진스</li>
                      <li className="vote">4,224표</li>
                      <li className="btn">투표</li>
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul>
                      <li className="thumb">
                        <img
                          src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2023/0905/IE003199721_STD.jpg"
                          alt="해린"
                        />
                      </li>
                      <li className="info">
                        <dl className="rank same">10위</dl>
                        <dl className="name">해린</dl>
                      </li>
                      <li className="cate">뉴진스</li>
                      <li className="vote">4,224표</li>
                      <li className="btn">투표</li>
                    </ul>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ul className="more">
                      <div className="all">
                        전체 순위 보러가기<div className="arwBlue s16"></div>
                      </div>
                    </ul>
                  </SwiperSlide>
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </Swiper>
              </div>
            </div>

            <div className="sectionTitleSub">
              <div className="title">이 기사, 어떠셨나요?</div>
            </div>
            <div className="newsVote">
              {emotions.map((emotion) => (
                <ul
                  key={emotion.emotionType}
                  onClick={() => handleEmotionClick(emotion.emotionType)}
                >
                  <li>
                    <img src={emotion.iconUrl} alt={emotion.name} />
                  </li>
                  <li>{emotion.name}</li>
                  <li>{emotion.count}</li>
                </ul>
              ))}
            </div>
            <div className="commentWrap">
              <div className="totalCnt">댓글 0</div>

              {/* WriteBox 컴포넌트를 댓글 폼으로 사용 */}
              <WriteBox
                contentsId={newsId}
                commentId={null}
                saveType="COMMENT"
                isReset={null}
              />
            </div>
          </div>

          <div className="rightWrap">
            <div className="rightSticky">
              <div className="dcTrend">
                <div className="dcTitle">
                  실시간 인기투표<div className="arw s24"></div>
                </div>
                <div className="swiper dcTrendRoll">
                  <div className="swiper-wrapper">
                    <Swiper
                      direction={"vertical"}
                      slidesPerView={"auto"}
                      spaceBetween={0}
                      className="swiper-slide"
                    >
                      <SwiperSlide>
                        <ul className="hoverImgPt">
                          <li className="thumb">
                            <img
                              src="https://i.namu.wiki/i/02Nd3r5_9XyQO8S9LMYQoVTCnsWO-NqYQf3N_PJYZmuxYOhJj5s9n9H66lozbQ9xB0zYl3GGRT3yzWiyVlTnWw.webp"
                              alt="치어리더"
                            />
                          </li>
                          <li className="info">
                            <dl className="date">23.06.14 ~ 24.06.30</dl>
                            <dl className="title">아이돌 걸그룹 랭킹</dl>
                            <dl className="btn">투표</dl>
                          </li>
                        </ul>
                      </SwiperSlide>
                      <SwiperSlide>
                        <ul className="hoverImgPt">
                          <li className="thumb">
                            <img
                              src="https://cdn.hankyung.com/photo/202404/BF.36389450.1.jpg"
                              alt="아이돌 보이그룹"
                            />
                          </li>
                          <li className="info">
                            <dl className="date">23.06.14 ~ 24.06.30</dl>
                            <dl className="title">아이돌 보이그룹 랭킹</dl>
                            <dl className="btn">투표</dl>
                          </li>
                        </ul>
                      </SwiperSlide>
                      <SwiperSlide>
                        <ul className="hoverImgPt">
                          <li className="thumb">
                            <img
                              src="https://file2.nocutnews.co.kr/newsroom/image/2022/01/31/202201312047237692_0.jpg"
                              alt="트로트 가수"
                            />
                          </li>
                          <li className="info">
                            <dl className="date">23.06.14 ~ 24.06.30</dl>
                            <dl className="title">트로트 가수 남성 랭킹</dl>
                            <dl className="btn">투표</dl>
                          </li>
                        </ul>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>

              <div className="stickyTitle">
                <span>{newsDetail.categoryName}</span> 주요뉴스
              </div>
              <div className="popularNewsRight">
                {recents.slice(0, 10).map((recent, index) => (
                  <ul key={recent.newsId}>
                    <li>{index + 1}</li>
                    <li>{recent.title}</li>
                    <li>
                      <img src={recent.thumbnail} alt={recent.title} />
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsDetailPage;
