import React from "react";
import styles from "./SearchBar.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.nav_right_searchContainer}>
      <IoSearchOutline className={styles.nav_right_searchIcon} />
      <input
        type="text"
        className={styles.nav_right_searchInput}
        placeholder={t("search")}
      />
    </div>
  );
};

export default SearchBar;