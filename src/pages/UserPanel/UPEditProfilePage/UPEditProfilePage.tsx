import Footer from "../../../components/Footer/Footer";
import styles from "./UPEditProfilePage.module.css";
import UPTitle from "../UPTitle/UPTitle";
import UPNav from "../UPNav/UPNav";
import { useTranslation } from "react-i18next";

export default function UPEditProfilePage() {
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: "var(--primary-color-2)" }}>
      <UPTitle />
      <div className={styles.page}>
        <UPNav active="2" />
        <div className={styles.content}>
          <div style={{ letterSpacing: "1px" }}>{t("updateInstructions")}</div>
          <div className={styles.dataSection}>
            <div className={styles.data}>
              <span>{t("firstName")}</span>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.data}>
              <span>{t("lastName")}</span>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.data}>
              <span>Email address:</span>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.data}>
              <span>{t("city")}</span>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.data}>
              <span>Zip code:</span>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.data}>
              <span>{t("address")}</span>
              <input type="text" className={styles.input} />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>Edit Profile</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
