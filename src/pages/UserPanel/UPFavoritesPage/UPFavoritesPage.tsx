import UPNav from "../UPNav/UPNav";
import UPTitle from "../UPTitle/UPTitle";
import styles from "./UPFavoritesPage.module.css";
import Footer from "../../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import Card from "../../../components/Card/Card";
import { getFavorites } from "../../../services/favorite";
import { useEffect, useState } from "react";

export default function UPFavoritesPage() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const fetchFavorites = async () => {
        const response = await getFavorites();
        const fav = response[0];
        setFavorites(fav);
    } 

    fetchFavorites();

  }, [favorites])

  return (
    <div style={{ backgroundColor: "var(--primary-color-2)" }}>
      <UPTitle />
      <div className={styles.page}>
        <UPNav active="5" />
        <div className={styles.content}>
        {
          favorites.length > 0 ? 
            favorites.map((favorite : any) => <Card key={favorite.id} title={favorite.products.name} description={favorite.products.description} price={favorite.products.price}/>) :
          <div style={{ fontWeight: "600" }}>{t("noFavProducts")}</div>
        }
        </div>
      </div>
      <Footer />
    </div>
  );
}