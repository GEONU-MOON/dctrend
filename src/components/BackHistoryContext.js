import React, { createContext, useRef, useEffect } from "react";

// 초기 컨텍스트 설정
export const BackHistoryContext = createContext({
  current: {
    backHistory: {},
    isBack: false,
  },
});

// 컨텍스트 Provider 정의
export const BackHistoryProvider = ({ children }) => {
  const backHistory = useRef({
    backHistory: {}, // 페이지별 스크롤 위치와 상태 저장
    isBack: false, // 뒤로 가기 여부 확인
  });

  // 뒤로가기를 감지하여 isBack 상태를 true로 설정
  useEffect(() => {
    const handlePopState = () => {
      backHistory.current.isBack = true;
      console.log("Back navigation detected, setting isBack to true.");
    };

    // `popstate` 이벤트 리스너 등록
    window.addEventListener("popstate", handlePopState);

    return () => {
      // `popstate` 이벤트 리스너 해제
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <BackHistoryContext.Provider value={backHistory}>
      {children}
    </BackHistoryContext.Provider>
  );
};
