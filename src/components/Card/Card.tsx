import styles from './Card.module.css'
import { RiStarSFill } from "react-icons/ri";

export default function Card() {
  return (
    <div className={styles.card}>
      <img src="https://picsum.photos/200/300" className={styles.cardImage} alt="product" />
      <div style={{ padding: "10px 10px 5px 10px" }}>
        <div className={styles.cardText} style={{ fontSize: "1.5rem" }}>Title</div>
        <div className={styles.cardText} style={{ fontSize: "0.9rem" }}>Description</div>
        <div className={styles.cardText} style={{ fontSize: "1.4rem", marginTop: "10px" }}>$100.00</div>
        <div className={styles.cardStars}>
          <RiStarSFill />
          <RiStarSFill />
          <RiStarSFill />
          <RiStarSFill />
          <RiStarSFill />
        </div>
      </div>
      <button className={styles.cardButton}>ADD TO CARD</button>
    </div>
  )
}
