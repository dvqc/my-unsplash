import { RefObject } from "react";

const afterAnimation = (ref: RefObject<HTMLElement>, callback: () => void) => {
  ref.current?.addEventListener(
    "animationend",
    () => {
      callback();
    },
    {
      once: true
    }
  );
};

export { afterAnimation };
