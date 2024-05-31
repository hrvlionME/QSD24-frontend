import React, { useEffect, useState } from 'react';
import styles from './ImageProduct.module.css';

export default function ImageProduct({ productImages } : {productImages : any})  {
    
    const [images, setImages] = useState(['https://picsum.photos/200/100', 'https://picsum.photos/200/200', 'https://picsum.photos/200/300']);
    const [currentImage, setCurrentImage] = useState(images[0]);

    const switchImg = (event: React.MouseEvent<HTMLImageElement, MouseEvent>, index: number) => {
        setCurrentImage(images[index]);
    }

    useEffect(() => {
        setImages(productImages);
        setCurrentImage(productImages[0]);
    }, [productImages]);

    return (
    <>
        <div className={styles.container}>      
            <div className={styles.smallImageContainer}>
                {images.map((image, index) => (
                    <img className={styles.smallImage} key={index} src={image} alt="product" onMouseOver={(event) => switchImg(event, index)}/>
                ))}
            </div>
            <div className={styles.bigImageContainer}>
                <img className={styles.bigImage} src={currentImage} alt="product"/>
            </div>
        </div>
    </>
  );
};