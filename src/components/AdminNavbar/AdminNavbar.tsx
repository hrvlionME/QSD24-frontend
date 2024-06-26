import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./AdminNavbar.module.css";
// ICONS
import { LuUsers } from "react-icons/lu";
import { LuInbox } from "react-icons/lu";
import { IoMdAnalytics } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { TbBrandOpenai } from "react-icons/tb";
import { IoIosColorPalette } from "react-icons/io";
import { SiZenn } from "react-icons/si";
import { useTranslation } from "react-i18next";

export default function AdminNavbar({ handleExpand }: { handleExpand: (state: boolean) => void }) {

  const { t } = useTranslation();

  const categories = [
    { name: t("Users"), path: "/admin/users", icon: <LuUsers /> },
    { name: t("Products"), path: "/admin/products", icon: <FaProductHunt /> },
    { name: t("Categories"), path: "/admin/categories", icon: <BiCategory /> },
    { name: t("Brands"), path: "/admin/brands", icon: <TbBrandOpenai /> },
    { name: t("Colors"), path: "/admin/colors", icon: <IoIosColorPalette /> },
    { name: t("Sizes"), path: "/admin/sizes", icon: <SiZenn /> },
  ];

  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("/admin/users");
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false); // State for drawer collapse

  useEffect(() => {
    setSelectedCategory(location.pathname);
  }, [location.pathname]);

  const toggleDrawer = () => {
    setIsDrawerCollapsed(!isDrawerCollapsed);
    handleExpand(isDrawerCollapsed);
  };

  return (
    <div
      className={`${styles.navbar} ${isDrawerCollapsed ? styles.collapsed : ""
        }`}
    >
      <div className={styles.navbar_title}>
        <Link to="/admin/users" className={styles.navbar_title_container}>
          <h3>
            Superadmin<span style={{ color: "red" }}>.</span>
          </h3>
        </Link>
        <div className={styles.navbar_drawer} onClick={toggleDrawer}>
          <div
            className={styles.navbar_drawer_item}
            style={{ width: "70%" }}
          ></div>
          <div
            className={styles.navbar_drawer_item}
            style={{ width: "100%" }}
          ></div>
          <div
            className={styles.navbar_drawer_item}
            style={{ width: "60%" }}
          ></div>
        </div>
      </div>
      <div className={styles.navbar_categories}>
        {categories.map((category, index) => (
          <Link
            to={category.path}
            className={`${styles.navbar_category} ${selectedCategory === category.path ? styles.selected : ""
              }`}
            key={index}
            onClick={() => {
              setSelectedCategory(category.path);
            }}
          >
            <div className={styles.navbar_category_icon}>{category.icon}</div>
            <div className={styles.navbar_category_text}>
              {isDrawerCollapsed ? null : category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
