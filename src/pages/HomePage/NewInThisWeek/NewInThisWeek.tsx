import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './NewInThisWeek.module.css';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { getProducts } from '../../../services/products';
import { useNavigate } from 'react-router-dom';
import { handleFavorite } from '../../../services/favorite'; 

export default function NewInThisWeek() {
    const [products, setProducts] = useState<any>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const cardsPerRow = Math.floor(windowWidth / 300) < products.length ? Math.floor(windowWidth / 300) : products.length;
    const navigate = useNavigate();
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

    function favoriteClick(id: number) {
        try { handleFavorite({ product_id: id }) }
        catch (err: any) { setError(err) }
    }

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
                        <div className={styles.cardImageWrapper} onClick={() => {navigate(`/product/${item.id}`)}}>
                            <img src={`http://127.0.0.1:8000/storage/products/${item.images[0]?.name}`} className={styles.cardImage} alt="product" />
                            <button className={styles.buttonOnImage}>{t("buy")}</button>
                        </div>
                        <div className={styles.cardContent}>
                            <button className={styles.productPrice}>100$</button>
                            <div className={styles.productName}>{item.name}</div>
                            <div className={styles.productDescription}>{item.description}</div>
                            <div className={styles.productDescription}>{t("brand")}: {item.brands.name}</div>
                            <div className={styles.cardFooter}>
                                {item.is_favorite ? <FaHeart style={{ cursor: "pointer" }} /> : <FaRegHeart style={{ cursor: "pointer" }} onClick={() => {favoriteClick(item.id)}} />}
                                <div style={{ cursor: "pointer" }} onClick={() => {navigate(`/product/${item.id}`)}}>{t("buy")}</div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>}
        </>
    )
}