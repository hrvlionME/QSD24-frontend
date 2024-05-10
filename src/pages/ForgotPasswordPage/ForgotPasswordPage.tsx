import React, { useState } from 'react';
import styles from './ForgotPasswordPage.module.css';
import image from '../../assets/images/forgotPassword.png'
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function ForgotPassowrdPage() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  function handleSubmit(event: any){
    console.log(email);
    if (!isValidEmail(event.target.value)) {
      setError("Required field, invalid email format.");
    } else {
      setError("");
    }
    //const response = await sendData();    
  }

  /*
  async function sendData(){
    axios.post()
    .then((data) => {
        console.log(data)
    })
    .catch()
  }
  */

  return (
    <>
      <div className={styles.root}>
        <Link  to="/login" className={styles.backArrow}><FiArrowLeftCircle/></Link>
        <img src={image} alt="" className={styles.img} />
        <input type="text" className={`${styles.emailInput} ${error && styles.errorInput}`} placeholder="Email address" value={email} onChange={handleEmailChange} />
        {error && <p className={styles.errorText}>{error}</p>}
        <button className={styles.btn} disabled={!isValidEmail(email)} onClick={handleSubmit}>Send email</button>
      </div>
    </>
  );
}
