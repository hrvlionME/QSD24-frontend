import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './NewInThisWeek.module.css';
import { FaRegHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { getProducts } from '../../../services/products';

export default function NewInThisWeek() {
    const [products, setProducts] = useState<any>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const cardsPerRow = Math.floor(windowWidth / 300) < products.length ? Math.floor(windowWidth / 300) : products.length;
    const [error, setError] = useState(null);
    const fetchData = async () => setProducts(await getProducts());
    const { t } = useTranslation();

    useEffect(() => {
        try { fetchData() }
        catch (err: any) { setError(err) }
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {products.length > 0 && <div className={styles.section}>
                <div className={styles.title}>{t("new_in_this_week")}</div>
                <Swiper
                    style={{ width: cardsPerRow * 245 + (cardsPerRow - 1) * 30, padding: "10px" }}
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    spaceBetween={30}
                    slidesPerView={cardsPerRow}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                >
                {products.map((item: any) => (
                    <SwiperSlide className={styles.card}>
                        <div className={styles.cardImageWrapper}>
                            <img src="https://picsum.photos/200/300" className={styles.cardImage} alt="product" />
                            <button className={styles.buttonOnImage}>{t("buy")}</button>
                        </div>
                        <div className={styles.cardContent}>
                            <button className={styles.productPrice}>100$</button>
                            <div className={styles.productName}>{item.name}</div>
                            <div className={styles.productDescription}>{item.description}</div>
                            <div className={styles.productDescription}>{t("brand")}: {item.brands.name}</div>
                            <div className={styles.cardFooter}>
                                <FaRegHeart style={{ cursor: "pointer" }} />
                                <div style={{ cursor: "pointer" }}>{t("buy")}</div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>}
        </>
    )
}