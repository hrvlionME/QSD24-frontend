import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer'
import styles from './FavoritesPage.module.css'
import { useTranslation } from "react-i18next";
import { getFavorites } from '../../services/favorite';

export default function FavoritesPage() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const fetchFavorites = async () => {
        const response = await getFavorites();
        const fav = response[0];
        setFavorites(fav);
    } 

    fetchFavorites();
    console.log(favorites)
  }, [favorites])

  return (
    <>
      <div className={styles.page}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{t("favorites")}</div>
        </div>
        <div className={styles.cards}>
        {
          favorites.length > 0 ? 
            favorites.map((favorite : any) => <Card key={favorite.id} title={favorite.products.name} description={favorite.products.brands.name} price={favorite.products.price} image={favorite.products.images[0].name}/>) :
          <div className={styles.text}>{t("you_dont_have_any_products")}</div>
        }
        </div>
      </div>
      <Footer />
    </>
  );
}
