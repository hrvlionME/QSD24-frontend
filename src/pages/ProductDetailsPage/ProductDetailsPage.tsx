import React, { useState } from 'react';
import styles from './ProductDetailsPage.module.css';
import ImageProduct from '../../components/ImageProduct/ImageProduct';
import SizeGuide from '../../components/SizeGuide/SizeGuide';
import Footer from '../../components/Footer/Footer';
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";


export default function ProductDetailsPage()  {
   

  return (
    <>
        <div className={styles.container}>
            <div className={styles.left}>
              <ImageProduct/>
            </div>
            <div className={styles.right}>
              <div>
                <h3 className={styles.text}>Product name</h3>
                <h4 className={styles.text}>Brand name</h4>
              </div>
              <div className={styles.priceContainer}>
                <h4 className={styles.text}>70.00$</h4>
              </div>
              <div className={styles.sizeGuide}>
                <h4 className={styles.text}>Select Size</h4>
                <SizeGuide/>
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
                <button>
                <FiPlus/>
                <span>5</span>
                <FiMinus/>
                </button>
                <button className={styles.favorite}>
                <span><FiHeart/>Add to Favorites</span>
                </button>
              </div>
            </div>
        </div>
        <Footer/>
    </>
  );
};