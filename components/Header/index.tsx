import Header from "./Header";
import Left from "./Left";
import styles from "@styles/Header.module.scss";
import { signOut } from "next-auth/react";
import HeaderButton from "./HeaderButton";
import SearchBar from "./SearchBar";

const DefaultHeader = ({
  username,
  userImg,
  setSearch,
  children
}: {
  username: string;
  userImg: string;
  children?: React.ReactNode;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
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
        <SearchBar setSearch={setSearch}></SearchBar>
      </Left>
      <div className={styles["right"]}>{children}</div>
    </Header>
  );
};
export { Header, Left, HeaderButton };
export default DefaultHeader;
