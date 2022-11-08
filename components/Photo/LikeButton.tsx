import styles from "@styles/Image.module.scss";
import { addLike, removeLike } from "hooks";

const LikeButton = ({
  onButton,
  likesNumber,
  photoId,
  isLiked
}: {
  onButton: () => void;
  likesNumber: number;
  photoId: string;
  isLiked: boolean;
}) => {
  return (
    <div className={styles[`like`]}>
      <button
        className={isLiked ? styles[`pressed`] : ""}
        onClick={async () => {
          isLiked
            ? removeLike(photoId).then(onButton)
            : addLike(photoId).then(onButton);
        }}
      ></button>
      <span>{likesNumber}</span>
    </div>
  );
};

export default LikeButton;
