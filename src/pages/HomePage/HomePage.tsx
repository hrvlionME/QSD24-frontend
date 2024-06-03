import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import NewInThisWeek from "./NewInThisWeek/NewInThisWeek";
import Footer from "../../components/Footer/Footer";
import womenImg from "../../assets/images/women.webp";
import menImg from "../../assets/images/men.webp";
import childrenImg from "../../assets/images/children.webp";
import ChatComponent from "../../components/ChatComponent/ChatComponent";

export default function HomePage() {
  const { t } = useTranslation(); // Initialize useTranslation hook

  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.heroImage}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroSmText}>{t("in_the_mood_for_new")}</div>{" "}
          <div className={styles.heroLgText}>{t("style")}</div>{" "}
          <Link to="shop/all/1" className={styles.heroButton}>
            {t("shop_now")}
          </Link>{" "}
        </div>
      </div>
      <div className={styles.categorySection}>
        <Link
          to="shop/women/1"
          className={styles.categoryLink}
          style={{ backgroundImage: `url(${womenImg})` }}
        >
          <div className={styles.categoryLinkText}>{t("women")}</div>{" "}
        </Link>
        <Link
          to="shop/men/1"
          className={styles.categoryLink}
          style={{ backgroundImage: `url(${menImg})` }}
        >
          <div className={styles.categoryLinkText}>{t("men")}</div>{" "}
        </Link>
        <Link
          to="shop/children/1"
          className={styles.categoryLink}
          style={{ backgroundImage: `url(${childrenImg})` }}
        >
          <div className={styles.categoryLinkText}>{t("children")}</div>{" "}
        </Link>
      </div>
      <div className={styles.misionVisionSection}>
        <div className={styles.misionVisionImage}></div>
        <div className={styles.misionVisionBoxWrapper}>
          <div className={styles.misionVisionBox}>
            <div className={styles.misionVisionTitle}>{t("qsd_shop")}</div>{" "}
            <div className={styles.misionVisionText}>
              <div>{t("mission")}</div>
              <div>{t("vision")}</div>
            </div>
          </div>
        </div>
      </div>
      <NewInThisWeek />
      <ChatComponent />
      <Footer />
    </>
  );
}