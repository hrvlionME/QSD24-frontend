import styles from './Card.module.css'
import { RiStarSFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

export default function Card() {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <img src="https://picsum.photos/200/300" className={styles.cardImage} alt="product" />
      <div className={styles.cardContent}>
        <div className={styles.cardText} style={{ fontSize: "1.4rem" }}>{t("title")}</div>
        <div className={styles.cardText} style={{ fontSize: "0.9rem", fontWeight: "400" }}>{t("description")}</div>
        <div className={styles.cardText} style={{ fontSize: "1.3rem", marginTop: "10px" }}>${t("price")}</div>
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
