import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import APUsers from "./APUsers/APUsers";
import styles from "./AdminPage.module.css";
import userImg from "../../assets/images/user-icon.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import APCategories from "./APCategories/APCategories";
import { useTranslation } from "react-i18next";
import APBrands from "./APBrands/APBrands";
import APSizes from "./APSizes/APSizes";
import APColors from "./APColors/APColors";

const componentsMap: { [key: string]: React.ComponentType } = {
  "users": APUsers,
  "categories": APCategories,
  "brands": APBrands,
  "colors": APColors,
  "sizes": APSizes
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function AdminPage() {
  const { category } = useParams<{ category: string }>();
  const Component = componentsMap[category || "users"] || APUsers;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleHomeClick = () => {
    navigate("/")
  }

  const handleLogoutClick = () => {
    navigate("/")
  }


  return (
    <div className={styles.admin_container}>
      <AdminNavbar />
      <div className={styles.admin_content}>
        <div className={styles.admin_content_header}>
          <p className={styles.admin_content_headerTitle}>
            {t(capitalizeFirstLetter(category || "Users"))}
          </p>
          <div className={styles.admin_content_header_profileContainer}>
            <div
              className={styles.admin_content_header_profileContainerDropdown}
              onClick={toggleDropdown}
            >
              <div className={styles.admin_content_header_profileTopContainer}>
                <img
                  src={userImg}
                  className={styles.admin_content_header_img}
                  alt={t("user")}
                />
                <p style={{ paddingRight: "5px" }}>Tin Minarik</p>
                <div
                  className={`${
                    isProfileOpen
                      ? styles.admin_content_header_arrowRight
                      : styles.admin_content_header_arrowDown
                  }`}
                >
                  <IoIosArrowDown />
                </div>
              </div>
              <div
                className={`${
                  isProfileOpen
                    ? styles.admin_content_header_profileBottomContainer
                    : styles.admin_content_header_profileBottomContainerClosed
                }`}
              >
                <button onClick={handleHomeClick}>{t("Home")}</button>
                <button onClick={toggleTheme}>
                  {theme === "light" ? (
                    <>
                      <IoMoon style={{ color: "black", paddingRight: "5px" }} />
                      {t("Dark")}
                    </>
                  ) : (
                    <>
                      <IoMdSunny
                        style={{ color: "orange", paddingRight: "5px" }}
                      />
                      {t("Light")}
                    </>
                  )}
                </button>
                <button onClick={handleLogoutClick}>{t("Log out")}</button>
              </div>
            </div>
          </div>
        </div>
        <Component />
      </div>
    </div>
  );
}
