import styles from "@styles/Image.module.scss";

const PhotosContainer = ({ photos }: { photos?: JSX.Element[] }) => {
  return <div className={styles["images-container"]}>{photos}</div>;
};

export default PhotosContainer;
