import UPNav from "../UPNav/UPNav";
import UPTitle from "../UPTitle/UPTitle";
import styles from "./UPFavoritesPage.module.css";
import Footer from "../../../components/Footer/Footer";
import { useTranslation } from "react-i18next";

export default function UPFavoritesPage() {
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: "var(--primary-color-2)" }}>
      <UPTitle />
      <div className={styles.page}>
        <UPNav active="5" />
        <div className={styles.content}>
          <div style={{ fontWeight: "600" }}>{t("noFavProducts")}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
