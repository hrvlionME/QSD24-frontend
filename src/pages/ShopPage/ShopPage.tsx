import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Filter from "./Filter/Filter";
import Footer from "../../components/Footer/Footer";
import styles from "./ShopPage.module.css";
import { FaFilter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function ShopPage() {
  const { t } = useTranslation();
  const { category, id } = useParams();
  const [showFilter, setShowFilter] = useState(
    window.innerWidth > 768 ? true : false
  );

  useEffect(() => {
    const resizeListener = () => {
      window.innerWidth > 768 ? setShowFilter(true) : setShowFilter(false);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <>
      <div className={styles.page}>
        {showFilter && <Filter />}
        {showFilter && window.innerWidth <= 768 && (
          <div
            className={styles.blockContent}
            onClick={() => setShowFilter(false)}
          ></div>
        )}
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              {category!.charAt(0).toUpperCase() + category!.slice(1)}
            </div>
            <FaFilter
              className={styles.filterIcon}
              onClick={() => setShowFilter(!showFilter)}
            />
          </div>
          <div className={styles.cards}>
            <div className={styles.text}>{t("noProducts")}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
