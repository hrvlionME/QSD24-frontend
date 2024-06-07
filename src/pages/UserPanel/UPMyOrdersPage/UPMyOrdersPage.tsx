import { useState } from "react";
import styles from "./UPMyOrdersPage.module.css";
import { useTranslation } from "react-i18next";
import Card from "../../../components/Card/Card";

export default function UPMyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation();

  return (
    <>
      {orders.length === 0 && <div className={styles.text}>{t("noOrders")}</div>}
      {orders.length > 0 && <div className={styles.content}>
        {orders.map((item: any) => (
          <Card 
            image={"test"}
            title={"Title"}
            description={"Description"}
            price={100}
            numberOfStars={item.average_rating}
          />
        ))}
      </div>}
    </>
  );
}
