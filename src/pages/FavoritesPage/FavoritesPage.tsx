import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer'
import { getFavorites } from '../../services/favorite';
import styles from './FavoritesPage.module.css'
import { useTranslation } from "react-i18next";
import { Circles } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


export default function FavoritesPage() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        const fav = response[0].filter((fav: any) => fav.user_id === user.id);
        setFavorites(fav);
      }
      catch(err: any) { setError(err) }
    } 

    fetchFavorites();
    setLoading(false);
  }, [])


  console.log(favorites)

  return (
    <>
     {loading ? <div className={styles.loader}><Circles color="#6C63FF" height={60} width={60}/></div> : <div>
      <div className={styles.page}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{t("favorites")}</div>
        </div>
        <div className={styles.cards}>
        {
          favorites.length > 0 ? 
            favorites.map((favorite : any) => <Card key={favorite.id} title={favorite.products.name} description={favorite.products.brands.name} price={favorite.products.price} image={favorite.products.images[0].name} numberOfStars={favorite.products.average_rating}/>) :
          <div className={styles.text}>{t("you_dont_have_any_products")}</div>
        }
        </div>
      </div>
      <Footer />
      </div>}
    </>
  );
}
