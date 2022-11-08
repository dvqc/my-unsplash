import Header from "./Header";
import Left from "./Left";
import styles from "@styles/Header.module.scss";
import { signOut } from "next-auth/react";
import HeaderButton from "./HeaderButton";

const DefaultHeader = ({
  username,
  userImg,
  children
}: {
  username: string;
  userImg: string;
  children?: React.ReactNode;
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
      <div className={styles["right"]}>{children}</div>
    </Header>
  );
};
export { Header, Left, HeaderButton };
export default DefaultHeader;
