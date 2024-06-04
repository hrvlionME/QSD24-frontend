import styles from './Card.module.css'
import { RiStarSFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

export default function Card() {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <img src="https://picsum.photos/200/300" className={styles.cardImage} alt="product" />
      <div className={styles.cardContent}>
        <div className={styles.cardText}>Title</div>
        <div className={styles.cardText} style={{ fontSize: "0.9rem", fontWeight: "400" }}>Description</div>
        <div className={styles.cardText} style={{ marginTop: "10px" }}>$100</div>
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
