import { PhotosWithOwner } from "@mytypes/prisma.types";
import styles from "@styles/Image.module.scss";
import { addLike, removeLike } from "hooks";
import { KeyedMutator } from "swr";

const LikeButton = ({
  mutateFn,
  likesNumber,
  photoId,
  isLiked,
  data,
  i,
  j
}: {
  mutateFn: KeyedMutator<PhotosWithOwner[][]>;
  data: PhotosWithOwner[][];
  likesNumber: number;
  photoId: string;
  isLiked: boolean;
  i: number;
  j: number;
}) => {
  const handleClick = async () => {
    if (isLiked) {
      const newData = data.slice();
      newData[i][j]._count.likes += 1;
      mutateFn(newData, {
        optimisticData: newData,
        rollbackOnError: true
      });
      await addLike(photoId);
    } else {
      const newData = data.slice();
      newData[i][j]._count.likes -= 1;
      mutateFn(newData, {
        optimisticData: newData,
        rollbackOnError: true
      });
      await removeLike(photoId);
    }
  };

  return (
    <div className={styles[`like`]}>
      <button
        className={isLiked ? styles[`pressed`] : ""}
        onClick={handleClick}
      ></button>
      <span>{likesNumber}</span>
    </div>
  );
};

export default LikeButton;
