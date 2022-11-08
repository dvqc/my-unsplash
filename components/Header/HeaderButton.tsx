import styles from "@styles/Header.module.scss";

const HeaderButton = ({ onClick, children}: { children:string, onClick: () => void }) => {
  return (
    <button className={styles["add-button"]} onClick={onClick}>
      {children}
    </button>
  );
};
export default HeaderButton;
