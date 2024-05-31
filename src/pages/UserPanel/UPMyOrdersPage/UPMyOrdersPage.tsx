import UPNav from "../UPNav/UPNav";
import UPTitle from "../UPTitle/UPTitle";
import styles from "./UPMyOrdersPage.module.css";
import Footer from "../../../components/Footer/Footer";
import { useTranslation } from "react-i18next";

export default function UPMyOrdersPage() {
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: "var(--primary-color-2)" }}>
      <UPTitle />
      <div className={styles.page}>
        <UPNav active="4" />
        <div className={styles.content}>
          <div style={{ fontWeight: "600" }}>{t("noOrders")}</div>
          <button className={styles.button}>1</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
