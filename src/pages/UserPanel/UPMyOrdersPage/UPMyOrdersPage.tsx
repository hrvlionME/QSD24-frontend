import { useState } from "react";
import styles from "./UPMyOrdersPage.module.css";
import { useTranslation } from "react-i18next";
import Card from "../../../components/Card/Card";

export default function UPMyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.text}>{t("noOrders")}</div>
    </>
  );
}
