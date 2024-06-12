import { useState, useEffect } from "react";
import styles from "./UPEditProfilePage.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { editUser, getUser } from "../../../services/users";
import { useNavigate } from "react-router-dom";

export default function UPEditProfilePage() {
  const userId = useSelector((state: RootState) => state.user.id);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try { setData(await getUser(userId)) }
    catch (err: any) { setError(err) }
  }

  async function formSubmit() {
    try { await editUser(data) }
    catch(err: any) { setError(err) }
    navigate("/profile");
  }

  return (
    <div className={styles.content}>
      <div style={{ letterSpacing: "1px" }}>{t("dear")}<strong>{data?.first_name}</strong>{t("updateInstructions")}</div>
      <div className={styles.dataSection}>
        <div className={styles.data}>
          <span>{t("firstName")}</span>
          <input type="text" className={styles.input} value={data?.first_name} onChange={(event) => setData({...data, first_name: event.target.value})} spellCheck="false" />
        </div>
        <div className={styles.data}>
          <span>{t("lastName")}</span>
          <input type="text" className={styles.input} value={data?.last_name} onChange={(event) => setData({...data, last_name: event.target.value})} spellCheck="false" />
        </div>
        <div className={styles.data}>
          <span>Email address:</span>
          <input type="text" className={styles.input} value={data?.email} onChange={(event) => setData({...data, email: event.target.value})} spellCheck="false" />
        </div>
        <div className={styles.data}>
          <span>{t("city")}</span>
          <input type="text" className={styles.input} value={data?.city} onChange={(event) => setData({...data, city: event.target.value})} spellCheck="false" />
        </div>
        <div className={styles.data}>
          <span>Zip code:</span>
          <input type="text" className={styles.input} value={data?.zip_code} onChange={(event) => setData({...data, zip_code: event.target.value})} spellCheck="false" />
        </div>
        <div className={styles.data}>
          <span>{t("address")}</span>
          <input type="text" className={styles.input} value={data?.address} onChange={(event) => setData({...data, address: event.target.value})} spellCheck="false" />
        </div>
        <div className={styles.data}>
          <span>{t("phone")}</span>
          <input type="text" className={styles.input} value={data?.phone} onChange={(event) => setData({...data, phone: event.target.value})} spellCheck="false" />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={formSubmit}>Edit Profile</button>
      </div>
    </div>
  );
}