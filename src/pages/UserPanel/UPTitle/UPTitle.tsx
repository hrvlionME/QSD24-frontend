import { useTranslation } from "react-i18next";
import styles from "./UPTitle.module.css";

function UPTitle() {
  const { t } = useTranslation();

  return <div className={styles.title}>{t("myAccount")}</div>;
}

export default UPTitle;
