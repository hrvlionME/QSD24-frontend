import styles from './Card.module.css'
import { RiStarSFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { IoTerminal } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function Card({id, title, description , price, image, numberOfStars} : any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className={styles.card} onClick={() => {navigate(`/product/${id}`)}}>
      <div className={styles.cardImageWrapper}>
        <img src={`http://127.0.0.1:8000/storage/products/${image}`} className={styles.cardImage} alt="" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardText} style={{ fontSize: "1.4rem" }}>{title ? title : t("title")}</div>
        <div className={styles.cardText} style={{ fontSize: "0.9rem", fontWeight: "400" }}>{description ? description : t("description")}</div>
        <div className={styles.cardText} style={{ fontSize: "1.3rem", marginTop: "10px" }}>${price ? price : t("price")}</div>
        <div className={styles.cardStars}>
          <RiStarSFill style={{color: (numberOfStars > 0 ? "#f1d045" : "#ccc")}} />
          <RiStarSFill style={{color: (numberOfStars > 1 ? "#f1d045" : "#ccc")}} />
          <RiStarSFill style={{color: (numberOfStars > 2 ? "#f1d045" : "#ccc")}} />
          <RiStarSFill style={{color: (numberOfStars > 3 ? "#f1d045" : "#ccc")}} />
          <RiStarSFill style={{color: (numberOfStars > 4 ? "#f1d045" : "#ccc")}} />
        </div>
      </div>
      <button className={styles.cardButton}>{t("addToCart")}</button>
    </div>
  )
}
