import styles from "../styles/Header.module.scss";
const Header = ({ username }: { username: string }) => {
  return (
    <header className={styles["header"]}>
      <div className={styles["left"]}>
        <div className={styles["logo"]}>
          <h1>My Unsplash</h1>
          <p>{username}</p>
        </div>
        <input type="text" placeholder="Search by name" />
      </div>
      <button>Add a photo</button>
    </header>
  );
};

export default Header;
