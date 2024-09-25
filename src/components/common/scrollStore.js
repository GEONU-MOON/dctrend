// src/store/scrollStore.js
import { create } from "zustand"; // 명시적으로 import

export const useScrollStore = create((set) => ({
  targetIndex: null, // 클릭한 게시물의 인덱스 저장
  setTargetIndex: (index) => set({ targetIndex: index }), // 인덱스 설정
  resetTargetIndex: () => set({ targetIndex: null }), // 인덱스 초기화
}));
