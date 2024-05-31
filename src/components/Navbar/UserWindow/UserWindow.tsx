import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserWindow.module.css";
// Icons
import { IoIosArrowDown } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";

interface UserWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserWindow: React.FC<UserWindowProps> = ({ isOpen, onClose }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Default to "light" theme
  const [selectedItem, setSelectedItem] = useState("English"); // Default to "English"

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Apply the selected theme to the document
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  };

  const handleSignInClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleFaqClick = () => {
    navigate("/faq"); // Navigate to the FAQ page
  };

  return (
    <div className={`${styles.user_window} ${isOpen ? styles.open : ""}`}>
      <div className={styles.user_window_settings}>
        <p className={styles.user_window_title}>Settings</p>
        <div className={styles.user_window_container}>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropdownHeader} onClick={toggleDropdown}>
              <span className={styles.dropdownSelected}>{selectedItem}</span>
              <span className={styles.dropdownHyphen}>|</span>
              <span className={styles.dropdownArrow}>
                <IoIosArrowDown />
              </span>
            </div>
            {dropdownOpen && (
              <div className={styles.dropdownList}>
                {["English", "Bosanski", "Hrvatski", "Srpski"].map(
                  (item, index) => (
                    <div
                      key={index}
                      className={styles.dropdownItem}
                      onClick={() => handleItemClick(item)}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <p className={styles.user_window_faq} onClick={handleFaqClick}>
            FAQ
          </p>
        </div>
        <div className={styles.theme_toggle} onClick={toggleTheme}>
          {theme === "light" ? (
            <div className={styles.user_window_theme}>
              <IoMoon className={styles.user_window_theme_icon} />
              <p className={styles.user_window_theme_text}>Dark Mode</p>
            </div>
          ) : (
            <div className={styles.user_window_theme}>
              <IoMdSunny
                className={styles.user_window_theme_icon}
                color="orange"
              />
              <p className={styles.user_window_theme_text}>Light Mode</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <button
          className={styles.user_window_signIn}
          onClick={handleSignInClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default UserWindow;
