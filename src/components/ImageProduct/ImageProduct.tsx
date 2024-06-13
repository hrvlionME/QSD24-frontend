import React, { useEffect, useState } from 'react';
import styles from './ImageProduct.module.css';

export default function ImageProduct({ productImages } : {productImages : any})  {
    
    const [images, setImages] = useState(productImages);
    const [currentImage, setCurrentImage] = useState<any>(productImages[0] || { name: '' });

    const switchImg = (event: React.MouseEvent<HTMLImageElement, MouseEvent>, index: number) => {
        setCurrentImage(images[index]);
    }

    useEffect(() => {
        setImages(productImages);
        if (productImages.length > 0) {
            setCurrentImage(productImages[0]);
        } else {
            setCurrentImage({ name: '' });
        }

    }, [productImages]);


    return (
    <>
        <div className={styles.container}>      
            <div className={styles.smallImageContainer}>
                {images.map((image: any, index: number) => (
                    <img className={styles.smallImage} key={index}  src={`http://127.0.0.1:8000/storage/products/${image.name}`} alt="" onMouseOver={(event) => switchImg(event, index)}/>
                ))}
            </div>
            <div className={styles.bigImageContainer}>
                <img className={styles.bigImage}  src={`http://127.0.0.1:8000/storage/products/${currentImage.name}`} alt=""/>
            </div>
        </div>
    </>
  );
};