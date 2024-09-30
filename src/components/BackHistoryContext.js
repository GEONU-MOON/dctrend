import React, { createContext, useRef } from "react";

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
    backHistory: {}, // 페이지 별 스크롤 위치와 상태 저장
    isBack: false, // 뒤로 가기 여부 확인
  });

  return (
    <BackHistoryContext.Provider value={backHistory}>
      {children}
    </BackHistoryContext.Provider>
  );
};
