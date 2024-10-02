import { useContext, useState, useEffect, useLayoutEffect } from "react";
import { BackHistoryContext } from "../components/BackHistoryContext";

export const useBackControl = (prefixKey) => {
  const backContext = useContext(BackHistoryContext)?.current;

  if (!backContext) {
    throw new Error(
      "BackHistoryContext not found. Make sure your component is wrapped in a <BackHistoryProvider>."
    );
  }

  const [load, setLoad] = useState(false);
  const key = window.location.href + (prefixKey ?? "");

  // Ensure backHistory is properly initialized
  useEffect(() => {
    if (!backContext.backHistory) {
      backContext.backHistory = {};
    }
    if (!backContext.backHistory[key]) {
      backContext.backHistory[key] = {
        scrollPos: 0,
        state: {},
        ref: {},
      };
    }
    console.log("useBackControl: Key Generated:", key);
    console.log("useBackControl: BackContext Status:", backContext);
  }, [key, backContext]);

  useLayoutEffect(() => {
    setLoad(true);
  }, []);

  // 상태 복원 및 저장
  const useRemState = (state, keyName) => {
    if (!backContext.backHistory[key]) {
      backContext.backHistory[key] = { scrollPos: 0, state: {}, ref: {} };
    }
    const memoryValue = backContext.backHistory[key]?.state[keyName] ?? state;
    const [currentState, setCurrentState] = useState(memoryValue);

    useEffect(() => {
      if (load) {
        console.log(`Saving state for key: ${key}, state: ${keyName}`);
        backContext.backHistory[key].state[keyName] = currentState;
      }
    }, [currentState, key, keyName, load, backContext]);

    return [currentState, setCurrentState];
  };

  // 활성화 시 특정 함수 실행
  const useActive = (func, deps) => {
    useEffect(() => {
      console.log("useActive: Checking if isBack is true:", backContext.isBack);
      if (backContext.isBack && backContext.backHistory?.[key]) {
        console.log("useActive: Executing function and resetting isBack.");
        setTimeout(() => {
          func();
          backContext.isBack = false; // 콜백 실행 후 isBack을 false로 리셋
          console.log("useActive: isBack reset to false.");
        }, 0);
      }
    }, [func, key, ...deps]);
  };

  return {
    useRemState,
    useActive,
    backContext,
  };
};
