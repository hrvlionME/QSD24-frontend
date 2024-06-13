import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.css';
import ImageProduct from '../../components/ImageProduct/ImageProduct';
import SizeGuide from '../../components/SizeGuide/SizeGuide';
import Footer from '../../components/Footer/Footer';
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";
import Reviews from '../../components/Reviews/Reviews';
import { getProduct } from '../../services/products';
import { useParams } from 'react-router-dom';
import { getFavorites, handleFavorite } from '../../services/favorite';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/cartSlice';
import { Circles } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../redux/store';

interface Product {
  id: number;
  name: string;
  price: number;
  images: { name: string }[];
  color: string;
  selectedSize: any;
  sizes: { name: string }[];
  brands: { name: string };
  gender: string;
  description: string;
  amount: number;
  totalPrice: number;
  rating: any[];
  total_rating: number;
  average_rating: number;
}

export default function ProductDetailsPage()  {

  const { t } = useTranslation();
  const { id } = useParams(); 
  const [quantity, setQuantity] = useState(1);
  const [gender, setGender] = useState('')
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState<Product>({} as Product);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const user = useSelector((state: RootState) => state.user);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {

    setLoading(true);
    const fetchProduct = async () => {
      try {
        const product = await getProduct(Number(id));
        setProduct(product);
        setSizes(product.sizes);
        if (product.sizes.length > 0) {
          setGender(product.gender);
          setImages(product.images);
        }
      }
      catch(err: any) { setError(err) }
    }

    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        const favorites = response[0];
        const isFavorite = favorites.some((fav: any) => fav.product_id === Number(id) && fav.user_id === user.id);
        setFavorite(isFavorite);
      }
      catch (err: any) { setError(err) }
    } 

    fetchProduct();
    fetchFavorites();

    setLoading(false);

  }, [id])


  const handleSizeClick = (size: any) => {
    setSelectedSize(size);
  }

  const handleSubmit = async () => {

    const requestBody = {
      product_id: Number(id),
    };
    
    try {
      await handleFavorite(requestBody)
      setFavorite(!favorite)
    }
    catch (err: any) { setError(err) }
  }

  const addToCart = async () => {
    const productPayload: Product = {
      id: Number(id),
      name: product.name,
      price: product.price,
      images: images,
      sizes: product.sizes,
      color: product.color,
      selectedSize: selectedSize,
      brands: product.brands,
      gender: product.gender,
      description: product.description,
      amount: quantity,
      totalPrice: 0,
      rating: product.rating,
      total_rating: 0,
      average_rating: 0,
    }
    dispatch(addProductToCart(productPayload));

    toast.success(`${quantity} x ${product.name} added to cart`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  
  return (
    <>
    {loading ? <div className={styles.loader}><Circles color="#6C63FF" height={60} width={60}/></div> : <div>
        <div className={styles.container}>
            <div className={styles.left}>
              <ImageProduct productImages={images}/>
            </div>
            <div className={styles.right}>
              <div>
                <h3 className={styles.text}>{product.name || t("productName")}</h3>
                <h4 className={styles.text}>{product.brands?.name || t("brandName")}</h4>
              </div>
              <div className={styles.priceContainer}>
                <h4 className={styles.text}>${product.price ? `${(product.price).toFixed(2)}` : "0.00"}</h4>
              </div>
              <div className={styles.sizeGuide}>
                <h4 className={styles.text}> {t("selectSize")}</h4>
                <SizeGuide gender={gender}/>
              </div>
              <div className={styles.sizeContainer}>
              {sizes.map((size: any) => (
              <div
                key={size.name}
                className={`${styles.size} ${selectedSize === size ? styles.sizeSelected : ''}`}
                onClick={() => handleSizeClick(size)}
              >
                <span>{size.name}</span>
              </div>
            ))}
              </div>
              <div className={styles.amountFavorites}>
                <div className={styles.amount}>
                <FiMinus style={{cursor: "pointer"}} onClick={() => {if(quantity > 1) setQuantity(quantity - 1)}}/>
                <span>{quantity}</span>
                 <FiPlus style={{cursor: "pointer"}} onClick={() => setQuantity(quantity + 1)}/>
                </div>
                <div>
                  <button className={styles.favorite} onClick={handleSubmit}>
                    {favorite ? <span><FaHeart style={{color: "var(--logo-purple)"}}/>Remove from Favorites</span> : <span><FiHeart/>{t("addToFavorites")}</span>}
                  </button>
                </div>
              </div>
              <div className={styles.addCartContainer}>
                <button className={styles.addCart} onClick={addToCart} disabled={!selectedSize}><PiShoppingCartLight/>{t("addToCart")}</button>
              </div>
            </div>
           </div>
           <Reviews id={Number(id)} reviews={product.rating} totalRating={product.total_rating} averageRating={product.average_rating}/>
        <Footer/>
      </div>}
    </>
  );
};