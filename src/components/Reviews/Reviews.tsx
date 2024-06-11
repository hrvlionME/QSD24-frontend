import React, { useState } from "react";
import styles from "./Reviews.module.css";
import { Rating } from "react-simple-star-rating";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { rateProduct } from "../../services/products";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Reviews({id, reviews, totalRating, averageRating}: {id: number, reviews: any[], totalRating: number, averageRating: number}) {
  const { t } = useTranslation();
  const [showReviews, setShowReviews] = useState(false);
  const [rating, setRating] = useState(0); 
  const [description, setDescription] = useState("");


  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    const requestBody = {
      value: rating,
      product_id: id,
      description: description
    }

    if(rating >= 1 && rating <=5)
      await rateProduct(requestBody)

    toast.success("Successfully rated the item", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '.');
};

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.header}
          onClick={() => setShowReviews(!showReviews)}
        >
          <h4>{t("reviews")}({totalRating})</h4>
          <div>
            <Rating size={22} initialValue={averageRating} allowHover={false} />
            {showReviews ? <MdKeyboardArrowRight /> : <IoIosArrowDown />}
          </div>
        </div>
        {showReviews && (
          <div className={styles.reviews}>
            <div className={styles.rateContent}>
              <h4 className={styles.title}>{t("rateAndLeave")}</h4>
              <Rating size={22} onClick={handleRating}/>
            </div>
            <div>
              <textarea className={styles.reviewInput} onChange={(event) => setDescription(event.target.value)}/>
              <button className={styles.reviewButton} onClick={handleSubmit}>
                {t("submitReview")}
              </button>
            </div>
            <div style={{margin: "30px 0"}}>
              {reviews.map((review: any) => (
                <div style={{marginTop: "20px"}}>
                <div>
                <span><Rating initialValue={review.value} size={18} fillColor={"#000000"}/></span>
                <span style={{paddingLeft: "15px"}}>{review.user.first_name + " " + review.user.last_name}</span>
                <span className={styles.date}>{formatDate(review.created_at)}</span>
                </div>
                {review.description && <span>{review.description}</span>}
              </div>
              ))}
            </div> 
          </div>
        )}
      </div>
    </>
  );
}