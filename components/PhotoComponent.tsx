import styles from "../styles/Image.module.scss";

const Photo = ({ url, label }: { url: string; label: string }) => {
  return (
    <div
      className={styles["image-container"]}
      style={{
        background: "url(" + url + ") no-repeat center",
        backgroundSize: "cover"
      }}
    >
      <button>delete</button>
      <p>{label}</p>
    </div>
  );
};

export default Photo;
