import { Photo } from "@prisma/client";
import PhotoComponent from "./PhotoComponent";
import styles from "../styles/Image.module.scss";

const PhotosContainer = ({ photos }: { photos: Photo[] }) => {
  if (photos.length == 0)
    return (
      <div className={styles["no-images"]}>
        You have not added any photos yet
      </div>
    );
  return (
    <div className={styles["images-container"]}>
      {photos.map((photo, i) => (
        <PhotoComponent
          key={photo.id}
          url={photo.url}
          label={photo.label}
        ></PhotoComponent>
      ))}
    </div>
  );
};

export default PhotosContainer;
