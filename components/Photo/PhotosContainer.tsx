import { Photo } from "@prisma/client";
import PhotoComponent from "./PhotoComponent";
import styles from "@styles/Image.module.scss";
import { Dispatch, RefObject, SetStateAction } from "react";

const PhotosContainer = ({
  photos,
  selectDelPhoto,
  deleteModal
}: {
  photos: Photo[];
  selectDelPhoto: Dispatch<SetStateAction<string>>;
  deleteModal: RefObject<HTMLDialogElement>;
}) => {
  return (
    <div className={styles["images-container"]}>
      {photos.map((photo, i) => (
        <PhotoComponent
          key={photo.id}
          url={photo.url}
          label={photo.label}
          onDelete={() => {
            selectDelPhoto(photo.id);
            deleteModal.current?.showModal();
          }}
        ></PhotoComponent>
      ))}
    </div>
  );
};

export default PhotosContainer;
