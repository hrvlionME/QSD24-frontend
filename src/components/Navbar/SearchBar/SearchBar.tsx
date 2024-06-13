import React from "react";
import styles from "./SearchBar.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSearchTerm } from "../../../redux/searchSlice";

const SearchBar = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <div className={styles.nav_right_searchContainer}>
      <IoSearchOutline className={styles.nav_right_searchIcon} />
      <input
        type="text"
        className={styles.nav_right_searchInput}
        placeholder={t("search")}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default SearchBar;