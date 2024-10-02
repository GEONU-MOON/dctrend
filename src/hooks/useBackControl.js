import {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { BackHistoryContext } from "../components/BackHistoryContext";

export const useBackControl = (prefixKey) => {
  const backContext = useContext(BackHistoryContext)?.current;

  if (!backContext) {
    throw new Error(
      "BackHistoryContext not found. Make sure your component is wrapped in a <BackHistoryProvider>."
    );
  }

  const [load, setLoad] = useState(false);

  // Ensure key is properly defined
  const key = window.location.href + (prefixKey ?? "");

  // Log the key and backContext for debugging
  console.log("useBackControl: Key Generated:", key);
  console.log("useBackControl: Current BackContext:", backContext);

  // Ensure backHistory is properly initialized
  useEffect(() => {
    if (!backContext.backHistory[key]) {
      backContext.backHistory[key] = {
        scrollPos: 0,
        state: {},
        ref: {},
      };
    }
  }, [key, backContext]);

  useLayoutEffect(() => {
    setLoad(true);
  }, []);

  return {
    useRemState: (state, keyName) => {
      // Ensure the backContext and backHistory are properly initialized
      if (!backContext.backHistory[key]) {
        backContext.backHistory[key] = { scrollPos: 0, state: {}, ref: {} };
      }

      // If key does not exist, initialize with provided state
      const memoryValue = backContext.backHistory[key]?.state[keyName] ?? state;
      const resultState = useState(memoryValue);
      if (load) backContext.backHistory[key].state[keyName] = resultState[0];
      return resultState;
    },
    useActive: (func, deps) => {
      useEffect(() => {
        const isBack =
          backContext.isBack && Boolean(backContext.backHistory[key]);
        if (isBack) {
          setTimeout(() => {
            func();
          }, 0);
        }
      }, deps);
    },
    backContext,
  };
};
