import { useEffect } from "react";

const useKakaoShare = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("d39de52ae780e81f972d94758cab71b8");
    }
  }, []);

  const shareToKakao = (title, description, imageUrl, linkUrl) => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: linkUrl,
          webUrl: linkUrl,
        },
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
      ],
    });
  };

  return shareToKakao;
};

export default useKakaoShare;
