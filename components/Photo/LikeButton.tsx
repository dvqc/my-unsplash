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
      <button onClick={onButton}></button>
      {/* className={styles["pressed"]} */}
      <span>{likesNumber}</span>
    </div>
  );
};

export default LikeButton;
