// NavLinks.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navlinks.module.css";

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

interface NavLinksProps {
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({
  selectedCategory,
  onCategoryClick,
}) => {
  const categories = ["women", "men", "children", "all"];

  return (
    <ul>
      {categories.map((category) => (
        <NavLink
          key={category}
          label={category.toUpperCase()}
          to={`/shop/${category}/1`}
          selected={selectedCategory === category}
          onClick={() => onCategoryClick(category)}
        />
      ))}
    </ul>
  );
};

export default NavLinks;
