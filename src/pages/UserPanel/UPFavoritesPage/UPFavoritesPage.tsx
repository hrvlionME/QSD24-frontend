import { useState, useEffect } from "react";
import styles from "./UPFavoritesPage.module.css";
import { useTranslation } from "react-i18next";
import Card from "../../../components/Card/Card";
import { getFavorites } from "../../../services/favorite";


export default function UPFavoritesPage() {
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {

    const fetchFavorites = async () => {
        const response = await getFavorites();
        const favorites = response[0];
        setOrders(favorites);
    } 

    fetchFavorites();

  }, [])

  return (
    <>
      {orders.length === 0 && <div className={styles.text}>{t("noFavProducts")}</div>}
      {orders.length > 0 && <div className={styles.content}>
        {orders.map((item: any) => (
          <Card key={item.id} title={item.products.name} description={item.products.brands.name} price={item.products.price} image={item.products.images[0].name}/>
        ))}
      </div>}
    </>
  );
}
