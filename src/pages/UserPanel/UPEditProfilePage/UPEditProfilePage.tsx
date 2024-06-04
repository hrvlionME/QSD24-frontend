import styles from "./UPEditProfilePage.module.css";
import { useTranslation } from "react-i18next";

export default function UPEditProfilePage() {
  const { t } = useTranslation();

  return (
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
  );
}