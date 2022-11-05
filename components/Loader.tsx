import styles from "../styles/Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles["spinner"]}></div>
    </div>
  );
};

export default Loader