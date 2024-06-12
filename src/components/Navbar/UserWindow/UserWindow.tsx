import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserWindow.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, toggleThemeReducer } from "../../../redux/settingsSlice";
import { RootState } from "../../../redux/store";
import { logout } from "../../../redux/userSlice"; // Import the logout action
import userImg from "../../../assets/images/user-icon.png";

interface UserWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define a type for the language keys
type Language = "English" | "Bosanski" | "Hrvatski" | "Srpski";

const UserWindow: React.FC<UserWindowProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const settings = useSelector((state: RootState) => state.settings);
  const user = useSelector((state: RootState) => state.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(settings.theme); // Default to "light" theme
  const [selectedItem, setSelectedItem] = useState<Language>(settings.language); // Default to "English"

  const navigate = useNavigate(); // Initialize the navigate function
  const dispatch = useDispatch();

  useEffect(() => {
    // Apply the selected theme to the document
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    dispatch(toggleThemeReducer());
  };

  const handleItemClick = (item: Language) => {
    setSelectedItem(item);
    setDropdownOpen(false);
    const languageMap: Record<Language, string> = {
      English: "English",
      Bosanski: "Bosanski",
      Hrvatski: "Hrvatski",
      Srpski: "Srpski",
    };
    dispatch(setLanguage(languageMap[item]));
    i18n.changeLanguage(languageMap[item]);
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleLogOutClick = () => {
    dispatch(logout());
    navigate("");
  };

  const handleFaqClick = () => {
    navigate("/faq");
  };

  const handleAdminPanelClick = () => {
    navigate("/admin/users");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className={`${styles.user_window} ${isOpen ? styles.open : ""}`}>
      {user.token && (
        <>
          <p className={styles.user_window_profileTitle}>{t("profile")}</p>
          <div className={styles.user_window_profileInfo}>
            <img className={styles.user_window_profileInfo_image} src={userImg} alt="User image" />
            <div>
              <p className={styles.user_window_profileInfo_name}>{user.first_name} {user.last_name}</p>
              <p className={styles.user_window_profileTitle_email}>{user.email}</p>
            </div>
          </div>
        </>
      )}
      <div className={styles.user_window_settings}>
        <p className={styles.user_window_title}>{t("settings")}</p>
        <div className={styles.user_window_container}>
        {user.loggedIn &&
          <p className={styles.user_window_faq} onClick={handleProfileClick}>
            {t("personalSettings")}
          </p>}
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
        {!user.token ? (
          <button
            className={styles.user_window_signIn}
            onClick={handleSignInClick}
          >
            {t("signIn")}
          </button>
        ) : (
          <>{user.role === "1" &&
            <button
              className={styles.user_window_signIn}
              onClick={handleAdminPanelClick}
            >
              {t("superAdminPanel")}
            </button>
            }
            <button
              className={styles.user_window_signIn}
              onClick={handleLogOutClick}
            >
              {t("logOut")}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserWindow;
