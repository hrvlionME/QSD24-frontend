import React, { useState } from "react";
import styles from "./ProductDetailsPage.module.css";
import ImageProduct from "../../components/ImageProduct/ImageProduct";
import SizeGuide from "../../components/SizeGuide/SizeGuide";
import Footer from "../../components/Footer/Footer";
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import { PiShoppingCartLight } from "react-icons/pi";
import Reviews from "../../components/Reviews/Reviews";
import { useTranslation } from "react-i18next";

export default function ProductDetailsPage() {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <ImageProduct />
        </div>
        <div className={styles.right}>
          <div>
            <h3 className={styles.text}>{t("productName")}</h3>
            <h4 className={styles.text}>{t("brandName")}</h4>
          </div>
          <div className={styles.priceContainer}>
            <h4 className={styles.text}>70.00$</h4>
          </div>
          <div className={styles.sizeGuide}>
            <h4 className={styles.text}>{t("selectSize")}</h4>
            <SizeGuide />
          </div>
          <div className={styles.sizeContainer}>
            <div className={styles.size}>
              <span>S</span>
            </div>
            <div className={styles.sizeSelected}>
              <span>M</span>
            </div>
          </div>
          <div className={styles.amountFavorites}>
            <div className={styles.amount}>
              <FiMinus
                onClick={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
              />
              <span>{quantity}</span>
              <FiPlus onClick={() => setQuantity(quantity + 1)} />
            </div>
            <div>
              <button className={styles.favorite}>
                <span>
                  <FiHeart />
                  {t("addToFavorites")}
                </span>
              </button>
            </div>
          </div>
          <div className={styles.addCartContainer}>
            <button className={styles.addCart} disabled>
              <PiShoppingCartLight />
              {t("addToCart")}
            </button>
          </div>
        </div>
      </div>
      <Reviews />
      <Footer />
    </>
  );
}
