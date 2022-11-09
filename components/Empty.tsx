import styles from "@styles/Empty.module.scss";

const Empty = () => {
  return (
    <div className={styles["empty-container"]}>
      <div className={styles["empty"]}>There are no photos</div>
    </div>
  );
};

export default Empty;
