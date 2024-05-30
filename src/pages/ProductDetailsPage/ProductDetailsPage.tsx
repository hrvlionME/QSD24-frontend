import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.css';
import ImageProduct from '../../components/ImageProduct/ImageProduct';
import SizeGuide from '../../components/SizeGuide/SizeGuide';
import Footer from '../../components/Footer/Footer';
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";
import Reviews from '../../components/Reviews/Reviews';
import { getProduct } from '../../services/product';
import { useParams } from 'react-router-dom';
import { getFavorites } from '../../services/favorite';


export default function ProductDetailsPage()  {
  
  const { id } = useParams(); 
  const [quantity, setQuantity] = useState(1);
  const [gender, setGender] = useState('')
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState<{ name?: string, price?: number, brands?: { name?: string } | null } | null>({});
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {

    const fetchProduct = async () => {
      const product = await getProduct(Number(id));
      setProduct(product);
      setSizes(product.sizes);
      if (product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
        setGender(product.gender);
      }
    }
    fetchProduct();

  }, [id])

  console.log(product);

  const handleSizeClick = (size: any) => {
    setSelectedSize(size);
  }

  return (
    <>
        <div className={styles.container}>
            <div className={styles.left}>
              <ImageProduct/>
            </div>
            <div className={styles.right}>
              <div>
                <h3 className={styles.text}>{product?.name || "Product name"}</h3>
                <h4 className={styles.text}>{product?.brands?.name || "Brand name"}</h4>
              </div>
              <div className={styles.priceContainer}>
                <h4 className={styles.text}>${product?.price ? `${(product.price).toFixed(2)}` : "0.00"}</h4>
              </div>
              <div className={styles.sizeGuide}>
                <h4 className={styles.text}>Select Size</h4>
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
                <FiMinus onClick={() => {if(quantity > 1) setQuantity(quantity - 1)}}/>
                <span>{quantity}</span>
                 <FiPlus onClick={() => setQuantity(quantity + 1)}/>
                </div>
                <div>
                  <button className={styles.favorite} onClick={() => setFavorite(!favorite)}>
                    {favorite ? <span><FaHeart style={{color: "var(--logo-purple)"}}/>Remove from Favorites</span> : <span><FiHeart/>Add to Favorites</span>}
                  </button>
                </div>
              </div>
              <div className={styles.addCartContainer}>
                <button className={styles.addCart} disabled><PiShoppingCartLight/>ADD TO CART</button>
              </div>
            </div>
           </div>
           <Reviews/>
        <Footer/>
    </>
  );
};