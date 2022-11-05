import Header from "./Header";
import Left from "./Left";
import styles from "@styles/Header.module.scss";
import { signOut } from "next-auth/react";

const DefaultHeader = ({
  username,
  userImg,
  onAdd
}: {
  username: string;
  userImg: string;
  onAdd: () => void;
}) => {
  return (
    <Header>
      <Left>
        <button
          className={styles["logout"]}
          onClick={() => signOut()}
          title="Logout"
        >
          <img src="/images/logout.svg"></img>
        </button>
        <div
          className={styles["logo"]}
          style={{
            background: `url(${userImg}) no-repeat left`,
            backgroundSize: " 2.2rem"
          }}
        >
          <h1>My Unsplash</h1>
          <p>{username}</p>
        </div>
        <input
          className={styles["search"]}
          type="text"
          placeholder="Search by name"
        />
      </Left>
      <button className={styles["add-button"]} onClick={onAdd}>
        Add a photo
      </button>
    </Header>
  );
};
export { Header, Left };
export default DefaultHeader;
