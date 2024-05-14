<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import styles from './NewInThisWeek.module.css';
import { FaRegHeart } from "react-icons/fa";

export default function NewInThisWeek() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeDot, setActiveDot] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const cards = [
        { id: 1, price: "100$", name: "Product", description: "Description" },
        { id: 2, price: "100$", name: "Product", description: "Description" },
        { id: 3, price: "100$", name: "Product", description: "Description" },
        { id: 4, price: "100$", name: "Product", description: "Description" },
        { id: 5, price: "100$", name: "Product", description: "Description" },
        { id: 6, price: "100$", name: "Product", description: "Description" }
    ];

    const cardsPerRow = Math.floor(windowWidth / 300);
    const totalDots = cards.length - cardsPerRow + 1;

    return (
        <div className={styles.section}>
            <div className={styles.title}>• NEW IN THIS WEEK •</div>
            <div className={styles.cardsContainer}>
                {cards.slice(activeDot, activeDot + cardsPerRow).map(card => (
                    <div key={card.id} className={styles.card}>
                        <div className={styles.cardImageWrapper}>
                            <img src={`https://picsum.photos/200/300?random=${card.id}`} className={styles.cardImage} alt="product" />
                            <button className={styles.buttonOnImage}>BUY</button>
                        </div>
                        <div className={styles.cardContent}>
                            <button className={styles.productPrice}>{card.price}</button>
                            <div className={styles.productName}>{card.name}</div>
                            <div className={styles.productDescription}>{card.description}</div>
=======
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
>>>>>>> 8bbe104 (Added "new in this week" section)
                            <div className={styles.cardFooter}>
                                <FaRegHeart style={{ cursor: "pointer" }} />
                                <div style={{ cursor: "pointer" }}>BUY</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
<<<<<<< HEAD
            <div className={styles.dots}>
                {[...Array(totalDots)].map((_, index) => (
                    <div key={index} className={`${styles.dot} ${(index === activeDot) && styles.activeDot}`} onClick={() => setActiveDot(index)}></div>
                ))}
            </div>
        </div>
=======
        </>
>>>>>>> 8bbe104 (Added "new in this week" section)
    )
}
