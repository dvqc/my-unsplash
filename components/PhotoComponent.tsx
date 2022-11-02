import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import styles from "../styles/Image.module.scss";

const Photo = ({ url, label }: { url: string; label: string }) => {
  const bgImgStyle = {
    background: "url(" + url + ") no-repeat center",
    backgroundSize: "cover"
  };

  type showStates = "true" | "false" | "closing";
  const [show, setShow] = useState<showStates>("false");
  const divRef = useRef<HTMLDivElement>(null);

  const afterAnimation = (
    ref: RefObject<HTMLElement>,
    callback: () => void
  ) => {
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
  return (
    <div
      className={styles["image-container"]}
      style={bgImgStyle}
      onMouseEnter={(e) => {
        setShow("true");
        afterAnimation(divRef, () => setShow("true"));
      }}
      onMouseLeave={(e) => {
        setShow("closing");
        afterAnimation(divRef, () => setShow("false"));
      }}
    >
      <div className={styles["image-highlights"]} ref={divRef} data-show={show}>
        <button>delete</button>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default Photo;
