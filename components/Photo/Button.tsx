import styles from "@styles/Image.module.scss";
import { ButtonType } from "types/app.types";

const Button = ({
  type,
  onButton
}: {
  type: "like" | "delete";
  onButton: () => void;
}) => {
  return (
    <button className={styles[type]} onClick={onButton}>
      {type == "delete" ? "delete" : ""}
    </button>
  );
};

export default Button;
