import { useRef } from "react";
import styles from "../styles/Image.module.scss";

const Photo = ({ url, label }: { url: string; label: string }) => {
  const bgImgStyle = {
    background: "url(" + url + ") no-repeat center",
    backgroundSize: "cover"
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className={styles["image-container"]}
      style={bgImgStyle}
      onMouseEnter={(e) => {
        buttonRef.current?.removeAttribute("closed");
        buttonRef.current?.setAttribute("show", "");
      }}
      onMouseLeave={(e) => {
        buttonRef.current?.removeAttribute("show");
        buttonRef.current?.setAttribute("closing", "");
        buttonRef.current?.addEventListener(
          "animationend",
          () => {
            buttonRef.current?.removeAttribute("closing");
            buttonRef.current?.setAttribute("closed", "");
          },
          { once: true }
        );
      }}
    >
      <button
        ref={buttonRef}
        onFocus={() => console.log("clicked")}
        onClick={() => console.log("clicked")}
      >
        delete
      </button>
      <p>{label}</p>
    </div>
  );
};

export default Photo;
