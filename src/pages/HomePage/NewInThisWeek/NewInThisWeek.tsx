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
import { getFavorites, handleFavorite } from '../../../services/favorite'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export default function NewInThisWeek() {
    const [products, setProducts] = useState<any>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const cardsPerRow = Math.floor(windowWidth / 300) < products.length ? Math.floor(windowWidth / 300) : products.length;
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState<any[]>([]);
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user);

    const fetchData = async () => {
        try {
            const productsData = await getProducts();
            setProducts(productsData);
        } catch (err: any) {
            setError(err);
        }
    };

    const fetchFavorites = async () => {
        try {
            const response = await getFavorites();
            const fav = response[0];
            setFavorites(fav);
        } catch (err: any) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchFavorites();
        
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const favoriteClick = async (id: number) => {
        try {
            await handleFavorite({ product_id: id });
            fetchFavorites();
        } catch (err: any) {
            setError(err);
        }
    };

    const isFavorite = (productId: number) => {
        return favorites.some(fav => fav.product_id === productId && fav.user_id === user.id);
    };


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
                            <img src={`http://127.0.0.1:8000/storage/products/${item.images[0]?.name}`} className={styles.cardImage} alt="" />
                            <button className={styles.buttonOnImage}>{t("buy")}</button>
                        </div>
                        <div className={styles.cardContent}>
                            <button className={styles.productPrice}>${item.price}</button>
                            <div className={styles.productName}>{item.name}</div>
                            <div className={styles.productDescription}>{item.description}</div>
                            <div className={styles.productDescription}>{t("brand")}: {item.brands.name}</div>
                            <div className={styles.cardFooter}>
                            {isFavorite(item.id) ? 
                                    <FaHeart style={{ cursor: "pointer" }} onClick={() => {favoriteClick(item.id)}} /> : 
                                    <FaRegHeart style={{ cursor: "pointer" }} onClick={() => {favoriteClick(item.id)}} />}
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