import styles from "@styles/Image.module.scss";

const LikeButton = ({
  onButton,
  likesNumber
}: {
  onButton: () => void;
  likesNumber: number;
}) => {
  return (
    <div className={styles[`like`]}>
      <button className={styles["pressed"]} onClick={onButton}></button>
      <span>{likesNumber}</span>
    </div>
  );
};

export default LikeButton;
