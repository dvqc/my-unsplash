import styles from "@styles/Image.module.scss";
import { addLike, removeLike } from "hooks";
import { useState } from "react";

const LikeButton = ({
  likesNumber,
  isLiked,
  onClick,
  photoId
}: {
  likesNumber: number;
  isLiked: boolean;
  onClick: () => void;
  photoId: string;
}) => {
  const [likes, setLikes] = useState(likesNumber);
  const [liked, setLiked] = useState(isLiked);

  const resetState = () => {
    setLiked(isLiked);
    setLikes(likesNumber);
  };

  const handleClick = async () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(!liked);
      addLike(photoId).then(onClick).catch(resetState);
    } else {
      setLikes(likes - 1);
      setLiked(!liked);
      removeLike(photoId).then(onClick).catch(resetState);
    }
  };

  return (
    <div className={styles[`like`]}>
      <button
        className={liked ? styles[`pressed`] : ""}
        onClick={handleClick}
      ></button>
      <span>{likes}</span>
    </div>
  );
};

export default LikeButton;
