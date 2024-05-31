import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import qsdlogo from "../../assets/images/qsd_logo.png";
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";
import { VscMenu } from "react-icons/vsc";
import { TbLetterX } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";
import SearchBar from "./SearchBar/SearchBar";
import UserWindow from "./UserWindow/UserWindow";
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
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isUserWindowOpen, setIsUserWindowOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsXShown(false);
    setIsSearchBarOpen(false);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleX = () => {
    setIsXShown(!isXShown);
    setIsSearchBarOpen(!isSearchBarOpen);
    setIsMenuOpen(false);
  };

  const toggleUserWindow = () => {
    setIsUserWindowOpen(!isUserWindowOpen);
  };

  const handleFavoritesClick = () => {
    navigate("/shop/favorites/1");
  };

  const handleCartClick = () => {
    navigate("/cart");
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
        <div className={styles.nav_top}>
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

            <div className={styles.display_none}>
              {!isHomePage && selectedCategory !== "" && <SearchBar />}
            </div>
            {!isHomePage && (
              <button className={styles.nav_right_iconMenu} onClick={toggleX}>
                {isXShown ? <TbLetterX /> : <IoSearchSharp />}
              </button>
            )}
            <button
              className={styles.nav_right_icon}
              onClick={handleFavoritesClick}
            >
              <MdFavoriteBorder />
            </button>
            <button className={styles.nav_right_icon} onClick={handleCartClick}>
              <HiOutlineShoppingBag />
            </button>
            <div className={styles.nav_right_img} onClick={toggleUserWindow}>
              <MdAccountCircle className={styles.nav_right_profile} />
            </div>
          </div>
        </div>
        <div className={styles.nav_bottom}>
          {isMenuOpen && (
            <ul className={styles.mobileMenu_selection}>{renderNavLinks()}</ul>
          )}
          <div className={styles.mobileSearchbar}></div>
          {!isHomePage && selectedCategory !== "" && isSearchBarOpen && (
            <SearchBar />
          )}
          <UserWindow isOpen={isUserWindowOpen} onClose={toggleUserWindow} />{" "}
        </div>
      </nav>
    </div>
  );
};

export default NavbarPage;
