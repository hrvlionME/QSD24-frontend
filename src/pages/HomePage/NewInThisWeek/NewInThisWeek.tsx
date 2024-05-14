import styles from './NewInThisWeek.module.css'
import { FaRegHeart } from "react-icons/fa";

export default function NewInThisWeek() {
    return (
        <>
            <div className={styles.title}>• NEW IN THIS WEEK •</div>
            <div className={styles.cardsContainer}>
                {[1,2,3,4].map(() => (
                    <div className={styles.card}>
                        <div className={styles.cardImageWrapper}>
                            <img src="https://picsum.photos/200/300" className={styles.cardImage} alt="product" />
                            <button className={styles.buttonOnImage}>BUY</button>
                        </div>
                        <div className={styles.cardContent}>
                            <button className={styles.productPrice}>100$</button>
                            <div className={styles.productName}>Product name</div>
                            <div className={styles.productDescription}>Product description</div>
                            <div className={styles.productDescription}>Product description</div>
                            <div className={styles.cardFooter}>
                                <FaRegHeart style={{ cursor: "pointer" }} />
                                <div style={{ cursor: "pointer" }}>BUY</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
