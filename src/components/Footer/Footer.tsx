import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.main}>
      <div className={styles.align}>
        <hr />
        <div className={styles.align} style={{ justifyContent: "center" }}>
          <Link to="https://www.facebook.com/qsd.ba/" className={styles.icon}>
            <FaFacebook />
          </Link>
          <Link to="https://www.instagram.com/qsd.ba/" className={styles.icon}>
            <FaInstagram />
          </Link>
          <Link to="https://twitter.com/qsdbih" className={styles.icon}>
            <FaXTwitter />
          </Link>
          <Link
            to="https://www.linkedin.com/company/qsdbih/mycompany/"
            className={styles.icon}
          >
            <FaLinkedin />
          </Link>
          <Link
            to="https://www.tiktok.com/@qsd.ba?lang=en"
            className={styles.icon}
          >
            <FaTiktok />
          </Link>
        </div>
        <hr />
      </div>
      <div className={styles.info}>
        <div className={styles.infoColumn}>
          <strong>{t("qsdBiH")}</strong>
          <div style={{ marginTop: "7px" }}>hello@qsd.ba</div>
          <div>{t("address")}</div>
          <div>{t("phoneBH")}</div>
          <div>{t("phoneUSA")}</div>
          <div>{t("phoneUK")}</div>
        </div>
        <div className={styles.infoColumn}>
          <strong>{t("customerSupport")}</strong>
          <div style={{ marginTop: "7px" }}>
            <Link className={styles.link} to="/faq">
              {t("faq")}
            </Link>
          </div>
          <div>
            <Link className={styles.link} to="/contact-us">
              {t("contactUs")}
            </Link>
          </div>
        </div>
        <div className={styles.infoColumn}>
          <strong>{t("legalAgreement")}</strong>
          <div style={{ marginTop: "7px" }}>
            <Link className={styles.link} to="#">
              {t("privacyPolicy")}
            </Link>
          </div>
          <div>
            <Link className={styles.link} to="#">
              {t("cookiesPolicy")}
            </Link>
          </div>
          <div>
            <Link className={styles.link} to="#">
              {t("termsOfUse")}
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div style={{ marginTop: "15px" }}>{t("copyright")}</div>
    </div>
  );
}