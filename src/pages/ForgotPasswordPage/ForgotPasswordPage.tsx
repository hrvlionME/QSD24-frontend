import React, { useState } from 'react';
import styles from './ForgotPasswordPage.module.css';
import image from '../../assets/images/forgotPassword.png'
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function ForgotPassowrdPage() {

  const [email, setEmail] = useState("");

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  

  return (
    <>
      <div className={styles.root}>
        <Link  to="/login" className={styles.backArrow}><FiArrowLeftCircle/></Link>
        <img src={image} alt="" className={styles.img} />
        <input type="text" className={styles.emailInput} placeholder="Email address" value={email} onChange={handleEmailChange} />
        <button className={styles.btn} disabled={!isValidEmail(email)}>Send email</button>
      </div>
    </>
  );
}
