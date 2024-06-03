import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navlinks.module.css";
import { useTranslation } from "react-i18next";

interface NavLinkProps {
  label: string;
  to: string;
  selected: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, to, selected, onClick }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <span className={styles.nav_left_text_link}>{t(label)}</span>
    </li>
  );
};

interface NavLinksProps {
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({
  selectedCategory,
  onCategoryClick,
}) => {
  const { t } = useTranslation();
  const categories = ["women", "men", "children", "all"];

  return (
    <ul>
      {categories.map((category) => (
        <NavLink
          key={category}
          label={t(category.toUpperCase())}
          to={`/shop/${category}/1`}
          selected={selectedCategory === category}
          onClick={() => onCategoryClick(category)}
        />
      ))}
    </ul>
  );
};

export default NavLinks;