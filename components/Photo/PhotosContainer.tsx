import PhotoComponent from "./PhotoComponent";
import styles from "@styles/Image.module.scss";
import { Dispatch, RefObject, SetStateAction } from "react";
import { PhotosWithOwner } from "@mytypes/prisma.types";

import LikeButton from "./LikeButton";

const PhotosContainer = ({ photos }: { photos?: JSX.Element[] }) => {
  return <div className={styles["images-container"]}>{photos}</div>;
};

export default PhotosContainer;
