// SearchBar.tsx
import React from "react";
import styles from "./SearchBar.module.css";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className={styles.nav_right_searchContainer}>
      <IoSearchOutline className={styles.nav_right_searchIcon} />
      <input
        type="text"
        className={styles.nav_right_searchInput}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
