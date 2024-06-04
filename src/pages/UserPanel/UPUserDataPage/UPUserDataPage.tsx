import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./UPUserDataPage.module.css";
import { FaRegHeart } from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { getUser } from "../../../services/users";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function UPUserDataPage() {
  const userId = useSelector((state: RootState) => state.user.id);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState("");
  const { t } = useTranslation();
  
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData () {
    try { setData(await getUser(userId)) }
    catch(err: any) { setError(err) }
  };

  return (
    <div className={styles.content}>
      <div className={styles.buttonsSection}>
        <div>
          <Link to="/profile/favorites">
            <button className={styles.button}>
              <FaRegHeart />
            </button>
          </Link>
          <div className={styles.buttonText}>{t("favorites")}</div>
        </div>
        <div>
          <Link to="/profile/my-orders">
            <button className={styles.button}>
              <GiDeliveryDrone />
            </button>
          </Link>
          <div className={styles.buttonText}>{t("myOrders")}</div>
        </div>
      </div>
      <div className={styles.dataSection}>
        <div className={styles.data}>
          <span>{t("full_name")}</span>
          <input type="text" className={styles.input} value={data.first_name ? `${data?.first_name} ${data?.last_name}` : ""} spellCheck="false" disabled />
        </div>
        <div className={styles.data}>
          <span>Email address:</span>
          <input type="text" className={styles.input} value={data?.email} spellCheck="false" disabled />
        </div>
        <div className={styles.data}>
          <span>{t("city")}</span>
          <input type="text" className={styles.input} value={data?.city} spellCheck="false" disabled />
        </div>
        <div className={styles.data}>
          <span>Zip code:</span>
          <input type="text" className={styles.input} value={data?.zip_code} spellCheck="false" disabled />
        </div>
        <div className={styles.data}>
          <span>{t("address")}</span>
          <input type="text" className={styles.input} value={data?.address} spellCheck="false" disabled />
        </div>
        <div className={styles.data}>
          <span>{t("phone")}</span>
          <input type="text" className={styles.input} value={data?.phone} spellCheck="false" disabled />
        </div>
      </div>
    </div>
  );
}