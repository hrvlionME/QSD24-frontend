import styles from './Card.module.css'
import { RiStarSFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

interface CardProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function Card({title, description , price, image} : CardProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <img src={`http://127.0.0.1:8000/storage/products/${image}`} className={styles.cardImage} alt="product" />
      <div className={styles.cardContent}>
        <div className={styles.cardText} style={{ fontSize: "1.4rem" }}>{title ? title : t("title")}</div>
        <div className={styles.cardText} style={{ fontSize: "0.9rem", fontWeight: "400" }}>{description ? description : t("description")}</div>
        <div className={styles.cardText} style={{ fontSize: "1.3rem", marginTop: "10px" }}>${price ? price : t("price")}</div>
        <div className={styles.cardStars}>
          <RiStarSFill />
          <RiStarSFill />
          <RiStarSFill />
          <RiStarSFill />
          <RiStarSFill />
        </div>
      </div>
      <button className={styles.cardButton}>{t("addToCart")}</button>
    </div>
  )
}
