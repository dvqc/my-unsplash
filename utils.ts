import { MutableRefObject, RefObject } from "react";

const afterAnimation = (ref: RefObject<HTMLElement>, callback: () => void) => {
  ref.current?.addEventListener("animationend", callback, {
    once: true
  });
};

const closeModal = (
  ref: MutableRefObject<HTMLDialogElement | null>,
  cleanUpFunc: () => void
) => {
  ref.current?.setAttribute("closing", "");
  afterAnimation(ref, () => {
    ref.current?.removeAttribute("closing");
    ref.current?.close();
  });
  cleanUpFunc();
};

const isPositiveInteger = (num: string) => {
  return /^\d+$/.test(num);
};

const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());
  
export { afterAnimation, closeModal, isPositiveInteger, fetcher };
