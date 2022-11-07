import styles from "@styles/Image.module.scss";

const Button = ({ onButton }: { onButton: () => void }) => {
  return (
    <button className={styles["delete"]} onClick={onButton}>
      delete
    </button>
  );
};

export default Button;
