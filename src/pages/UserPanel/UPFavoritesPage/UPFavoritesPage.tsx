import { useState, useEffect } from "react";
import styles from "./UPFavoritesPage.module.css";
import { useTranslation } from "react-i18next";
import Card from "../../../components/Card/Card";
import { getFavorites } from "../../../services/favorite";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";


export default function UPFavoritesPage() {
  const [favorites, setFavorites] = useState<any>([]);
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        const favorites = response[0].filter((fav: any) => fav.user_id === user.id);
        setFavorites(favorites);
      }
      catch(err: any) {setError(err)}
    } 

    fetchFavorites();

  }, [])

  return (
    <>
      {favorites.length === 0 && <div className={styles.text}>{t("noFavProducts")}</div>}
      {favorites.length > 0 && <div className={styles.content}>
        {favorites.map((item: any) => (
          <div>
            {item.products && <Card key={item?.id} id={item?.products?.id} title={item?.products?.name} description={item?.products?.brands?.name} price={item?.products?.price} numberOfStars={item?.products?.average_rating} image={item?.products?.images[0]?.name} />}
          </div>
        ))}
      </div>}
    </>
  );
}
