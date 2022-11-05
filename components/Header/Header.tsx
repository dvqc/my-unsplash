import styles from "@styles/Header.module.scss";

const Header = ({ children }: { children: React.ReactNode }) => {
  return <header className={styles["header"]}>{children}</header>;
};

export default Header;
