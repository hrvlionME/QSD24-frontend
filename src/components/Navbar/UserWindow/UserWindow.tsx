import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserWindow.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

interface UserWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define a type for the language keys
type Language = "English" | "Bosanski" | "Hrvatski" | "Srpski";

const UserWindow: React.FC<UserWindowProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Default to "light" theme
  const [selectedItem, setSelectedItem] = useState<Language>("English"); // Default to "English"

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

  const handleItemClick = (item: Language) => {
    setSelectedItem(item);
    setDropdownOpen(false);
    const languageMap: Record<Language, string> = {
      English: "en",
      Bosanski: "ba",
      Hrvatski: "hr",
      Srpski: "srb",
    };
    i18n.changeLanguage(languageMap[item]);
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
        <p className={styles.user_window_title}>{t("settings")}</p>
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
                {([
                  "English",
                  "Bosanski",
                  "Hrvatski",
                  "Srpski",
                ] as Language[]).map((item, index) => (
                  <div
                    key={index}
                    className={styles.dropdownItem}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className={styles.user_window_faq} onClick={handleFaqClick}>
            {t("faq")}
          </p>
        </div>
        <div className={styles.theme_toggle} onClick={toggleTheme}>
          {theme === "light" ? (
            <div className={styles.user_window_theme}>
              <IoMoon className={styles.user_window_theme_icon} />
              <p className={styles.user_window_theme_text}>{t("darkMode")}</p>
            </div>
          ) : (
            <div className={styles.user_window_theme}>
              <IoMdSunny
                className={styles.user_window_theme_icon}
                color="orange"
              />
              <p className={styles.user_window_theme_text}>{t("lightMode")}</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <button
          className={styles.user_window_signIn}
          onClick={handleSignInClick}
        >
          {t("signIn")}
        </button>
      </div>
    </div>
  );
};

export default UserWindow;