import React from "react";
import { useTranslation } from "react-i18next";
import Footer from '../../components/Footer/Footer';
import styles from './ContactUs.module.css';


export default function ContactUs() {
  const { t } = useTranslation();


  return (
    <>
      <div className={styles.container}>
          <div className={styles.background}>
            <h1>{t('how_can_we_help')}</h1>
          </div>
          <div className={styles.formBox}>
            <h3>{t('contact_us_directly')}</h3>
            <label>{t("full_name")}</label>
            <input type="text"/>
            <label>{t("email_address")}</label>
            <input type="text"/>
            <label>{t("subject")}</label>
            <input type="text"/>
            <label>{t("message")}</label>
            <textarea/>
            <div className={styles.btnBox}>
            <button className={styles.btn}>
            {t("send_message")}
            </button>
          </div>
          </div>
      </div>
      <Footer/>
    </>
  );
}