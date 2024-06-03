import { Link } from "react-router-dom";
import styles from "./UPNav.module.css";
import { useTranslation } from "react-i18next";

export default function UPNav({ active }: any) {
  const { t } = useTranslation();

  return (
    <div className={styles.nav}>
      <div className={styles.listTitle}>USER PANEL</div>
      <ul className={styles.list}>
        <li className={active === "1" && styles.active}>
          <Link to="/profile" className={styles.link}>
            {t("userData")}
          </Link>
        </li>
        <li className={active === "2" && styles.active}>
          <Link to="/profile/edit" className={styles.link}>
            {t("editProfile")}
          </Link>
        </li>
        <li className={active === "3" && styles.active}>
          <Link to="/profile/change-password" className={styles.link}>
            {t("change_password")}
          </Link>
        </li>
        <li className={active === "4" && styles.active}>
          <Link to="/profile/my-orders" className={styles.link}>
            {t("myOrders")}
          </Link>
        </li>
        <li className={active === "5" && styles.active}>
          <Link to="/profile/favorites" className={styles.link}>
            {t("favorites")}
          </Link>
        </li>
      </ul>
    </div>
  );
}