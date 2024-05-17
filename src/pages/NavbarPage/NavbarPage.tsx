import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarPage.module.css";
import qsdlogo from "../../assets/images/qsd_logo.png";
import userlogo from "../../assets/images/user-icon.png";
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";

const NavbarPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.nav_left}>
          <Link to="/" className={styles.nav_left_logo_container}>
            <img
              className={styles.nav_left_logo}
              src={qsdlogo}
              alt="Company Logo"
              onClick={() => handleCategoryClick("")}
            />
          </Link>
          <div className={styles.nav_left_text_container}>
            <ul>
              <li
                className={`${styles.nav_left_text} ${
                  selectedCategory === "women" && styles.nav_left_text_selected
                }`}
                onClick={() => handleCategoryClick("women")}
              >
                <Link to="/shop/women/1">WOMEN</Link>
              </li>
              <li
                className={`${styles.nav_left_text} ${
                  selectedCategory === "men" && styles.nav_left_text_selected
                }`}
                onClick={() => handleCategoryClick("men")}
              >
                <Link to="/shop/men/1">MEN</Link>
              </li>
              <li
                className={`${styles.nav_left_text} ${
                  selectedCategory === "children" &&
                  styles.nav_left_text_selected
                }`}
                onClick={() => handleCategoryClick("children")}
              >
                <Link to="/shop/children/1">CHILDREN</Link>
              </li>
              <li
                className={`${styles.nav_left_text} ${
                  selectedCategory === "all" && styles.nav_left_text_selected
                }`}
                onClick={() => handleCategoryClick("all")}
              >
                <Link to="/shop/all/1">ALL</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.nav_right}>
          <div className={styles.nav_right_searchContainer}>
            <IoSearchOutline className={styles.nav_right_searchIcon} />
            <input
              type="text"
              className={styles.nav_right_searchInput}
              placeholder="Search..."
            />
          </div>
          <button className={styles.nav_right_icon}>
            <MdFavoriteBorder />
          </button>
          <button className={styles.nav_right_icon}>
            <HiOutlineShoppingBag />
          </button>
          <div className={styles.nav_right_img}>
            <img src={userlogo} alt="user logo" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarPage;
