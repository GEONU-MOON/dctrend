import {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { BackHistoryContext } from "../components/BackHistoryContext";

// IntersectionObserver를 사용한 스크롤 복원 훅
const useScrollRestoration = (key, backContext) => {
  useEffect(() => {
    const isBack =
      backContext.isBack && Boolean(backContext.backHistory[key]?.scrollPos);
    console.log(
      "useScrollRestoration: isBack?",
      isBack,
      "key:",
      key,
      "scrollPos:",
      backContext.backHistory[key]?.scrollPos
    );

    if (!isBack) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log(
            "Scroll Restoration Triggered:",
            backContext.backHistory[key]?.scrollPos
          );
          window.scrollTo(0, backContext.backHistory[key]?.scrollPos ?? 0);
          observer.disconnect();
        }
      },
      { threshold: 1.0 }
    );

    const listContainer = document.querySelector(".newsList .list");
    if (listContainer) observer.observe(listContainer);

    return () => observer.disconnect();
  }, [backContext.isBack, backContext.backHistory, key]);
};

// useBackControl 훅 정의
export const useBackControl = (prefixKey) => {
  const [load, setLoad] = useState(false);
  const backContext = useContext(BackHistoryContext).current;
  const key = window.location.href + (prefixKey ?? "");

  console.log("useBackControl: Current URL Key:", key);

  if (!backContext.backHistory[key]) {
    backContext.backHistory[key] = {
      scrollPos: 0,
      state: {},
      ref: {},
    };
  }

  console.log("Back History Context:", backContext);

  useScrollRestoration(key, backContext);

  const useMount = (func, deps) => {
    useEffect(() => {
      const isBack =
        backContext.isBack && Boolean(backContext.backHistory[key]);
      if (!isBack) {
        console.log("useMount: Function Triggered (Not Back Navigation)");
        func();
      }
    }, [...deps]);
  };

  const useActive = (func, deps) => {
    useEffect(() => {
      const isBack =
        backContext.isBack && Boolean(backContext.backHistory[key]);
      if (isBack) {
        console.log("useActive: Function Triggered (Back Navigation)");
        setTimeout(() => {
          func();
        }, 0);
      }
    }, [...deps]);
  };

  const useRemState = (state, keyName) => {
    const memoryValue = backContext.backHistory[key]?.state[keyName] ?? state;
    const resultState = useState(memoryValue);

    console.log("useRemState: Memory Value for", keyName, memoryValue);

    if (load) backContext.backHistory[key].state[keyName] = resultState[0];

    return resultState;
  };

  const useRemRef = (ref, keyName) => {
    const memoryValue =
      backContext.backHistory[key]?.ref[keyName]?.current ?? ref;
    const resultRef = useRef(memoryValue);

    if (load) backContext.backHistory[key].ref[keyName] = resultRef;

    return resultRef;
  };

  useLayoutEffect(() => {
    setLoad(true);
  }, []);

  return {
    useMount,
    useActive,
    useRemState,
    useRemRef,
  };
};
