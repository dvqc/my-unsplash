import { useRef, useState } from "react";
import styles from "@styles/Image.module.scss";
import { afterAnimation } from "../../utils";

const Photo = ({
  url,
  label,
  onDelete
}: {
  url: string;
  label: string;
  onDelete: () => void;
}) => {
  const bgImgStyle = {
    background: "url(" + url + ") no-repeat center",
    backgroundSize: "cover"
  };

  type showStates = "true" | "false" | "closing";
  const [show, setShow] = useState<showStates>("false");
  const divRef = useRef<HTMLDivElement>(null);

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
        <button className={styles["like"]}></button>
        <button className={styles["delete"]} onClick={onDelete}>
          delete
        </button>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default Photo;
