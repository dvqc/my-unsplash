import styles from "@styles/Header.module.scss";

const Left = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles["left"]}>{children}</div>;
};

export default Left;
