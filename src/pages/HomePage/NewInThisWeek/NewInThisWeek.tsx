import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './NewInThisWeek.module.css';
import { FaRegHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function NewInThisWeek() {
    const { t } = useTranslation();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const cardsPerRow = Math.floor(windowWidth / 300);

    return (
        <div className={styles.section}>
            <div className={styles.title}>{t("new_in_this_week")}</div>
            <div className={styles.cardsContainer}>
                <Swiper
                    style={{ width: cardsPerRow * 245 + (cardsPerRow - 1) * 30, padding: "10px" }}
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    spaceBetween={30}
                    slidesPerView={cardsPerRow}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                >
                {[1,2,3,4,5,6,7,8,9,0].map(() => (
                    <SwiperSlide className={styles.card}>
                        <div className={styles.cardImageWrapper}>
                            <img src="https://picsum.photos/200/300" className={styles.cardImage} alt="product" />
                            <button className={styles.buttonOnImage}>{t("buy")}</button>
                        </div>
                        <div className={styles.cardContent}>
                            <button className={styles.productPrice}>100$</button>
                            <div className={styles.productName}>{t("title")}</div>
                            <div className={styles.productDescription}>{t("description")}</div>
                            <div className={styles.productDescription}>{t("brand")} : {t("description")}</div>
                            <div className={styles.cardFooter}>
                                <FaRegHeart style={{ cursor: "pointer" }} />
                                <div style={{ cursor: "pointer" }}>{t("buy")}</div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    )
}