import styles from "../styles/Separator.module.scss";

const Separator = ({ text }: { text: string }) => {
  return <div className={styles["separator"]}>{text}</div>;
};
export default Separator;
