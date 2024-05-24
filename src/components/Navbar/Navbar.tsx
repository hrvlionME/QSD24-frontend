import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
// IMAGES
import qsdlogo from "../../assets/images/qsd_logo.png";
import userlogo from "../../assets/images/user-icon.png";
// ICONS
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { VscMenu } from "react-icons/vsc";
import { TbLetterX } from "react-icons/tb";

interface NavLinkProps {
  label: string;
  to: string;
  selected: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, to, selected, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    navigate(to);
  };

  return (
    <li
      className={`${styles.nav_left_text} ${
        selected ? styles.nav_left_text_selected : ""
      }`}
      onClick={handleClick}
    >
      <span className={styles.nav_left_text_link}>{label}</span>
    </li>
  );
};

const NavbarPage = () => {
  const [isXShown, setIsXShown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false); // State to track if real search bar is shown
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (isMenuOpen) {
      setIsMenuOpen(false); // Close the hamburger menu
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen); // Toggle the state of the real search bar
  };

  const toggleX = () => {
    setIsXShown(!isXShown);
    if (!isXShown) {
      setIsSearchBarOpen(true); // Show the real search bar when X is clicked
    } else {
      setIsSearchBarOpen(false); // Hide the real search bar when X is clicked again
    }
  };

  const renderNavLinks = () => {
    const categories = ["women", "men", "children", "all"];
    return categories.map((category) => (
      <NavLink
        key={category}
        label={category.toUpperCase()}
        to={`/shop/${category}/1`}
        selected={selectedCategory === category}
        onClick={() => handleCategoryClick(category)}
      />
    ));
  };

  return (
    <div>
      <nav
        className={`${styles.nav} ${
          isSearchBarOpen ? styles.nav_extended : ""
        }`}
      >
        <div className={styles.nav_left}>
          <Link
            to="/"
            className={styles.nav_left_logo_container}
            onClick={closeMenu}
          >
            <img
              className={styles.nav_left_logo}
              src={qsdlogo}
              alt="Company Logo"
              onClick={() => handleCategoryClick("list")}
            />
          </Link>
          <div className={styles.nav_left_text_container}>
            <ul>{renderNavLinks()}</ul>
          </div>
        </div>
        <div className={styles.nav_right}>
          <button className={styles.nav_right_iconMenu} onClick={toggleMenu}>
            <VscMenu />
          </button>
          {!isHomePage && selectedCategory !== "" && (
            <div className={styles.nav_right_searchContainer}>
              <IoSearchOutline className={styles.nav_right_searchIcon} />
              <input
                type="text"
                className={styles.nav_right_searchInput}
                placeholder="Search..."
              />
            </div>
          )}
          <button className={styles.nav_right_iconMenu} onClick={toggleX}>
            {isXShown ? <TbLetterX /> : <IoSearchSharp />}
          </button>
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
      {isMenuOpen && (
        <ul className={styles.mobileMenu_selection}>{renderNavLinks()}</ul>
      )}
    </div>
  );
};

export default NavbarPage;
