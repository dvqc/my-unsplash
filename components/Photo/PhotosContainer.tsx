import PhotoComponent from "./PhotoComponent";
import styles from "@styles/Image.module.scss";
import { Dispatch, RefObject, SetStateAction } from "react";
import { PhotoWithOwner } from "@mytypes/prisma.types";

import Button from "./Button";

const PhotosContainer = ({
  photos,
  selectDelPhoto,
  deleteModal
}: {
  photos: PhotoWithOwner[];
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
          button={
            <Button
              type="like"
              onButton={() => {
                selectDelPhoto(photo.id);
                deleteModal.current?.showModal();
              }}
            ></Button>
          }
          owner={photo.owner?.name ?? ""}
        ></PhotoComponent>
      ))}
    </div>
  );
};

export default PhotosContainer;
