import styles from "@styles/Image.module.scss";

const PhotosContainer = ({ photoComponents }: { photoComponents?: JSX.Element[] }) => {
  return <div className={styles["images-container"]}>{photoComponents}</div>;
};

export default PhotosContainer;
