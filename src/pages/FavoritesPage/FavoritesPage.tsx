import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import styles from "./FavoritesPage.module.css";
import { useTranslation } from "react-i18next";

export default function FavoritesPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.page}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{t("favorites")}</div>
        </div>
        <div className={styles.cards}>
          <div className={styles.text}>{t("you_dont_have_any_products")}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
