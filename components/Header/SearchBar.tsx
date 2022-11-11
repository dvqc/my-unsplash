import styles from "@styles/Header.module.scss";

const SearchBar = ({
  setSearch
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <input
      className={styles["search"]}
      type="text"
      placeholder="Search"
      onKeyUp={(e) => {
        if (e.key == "Enter") setSearch(e.currentTarget.value);
      }}
    />
  );
};

export default SearchBar;
