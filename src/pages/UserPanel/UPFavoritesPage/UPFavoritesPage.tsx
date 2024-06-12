import { useState, useEffect } from "react";
import styles from "./UPFavoritesPage.module.css";
import { useTranslation } from "react-i18next";
import Card from "../../../components/Card/Card";
import { getFavorites } from "../../../services/favorite";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";


export default function UPFavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {

    const fetchFavorites = async () => {
        const response = await getFavorites();
        const favorites = response[0].filter((fav: any) => fav.user_id === user.id);
        setFavorites(favorites);
    } 

    fetchFavorites();

  }, [])

  return (
    <>
      {favorites.length === 0 && <div className={styles.text}>{t("noFavProducts")}</div>}
      {favorites.length > 0 && <div className={styles.content}>
        {favorites.map((item: any) => (
          <Card key={item.id} title={item.products.name} description={item.products.brands.name} price={item.products.price} numberOfStars={item.products.average_rating} image={item.products.images[0].name}/>
        ))}
      </div>}
    </>
  );
}
