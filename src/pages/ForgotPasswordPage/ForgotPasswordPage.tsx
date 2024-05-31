import React, { useState } from 'react';
import styles from './ForgotPasswordPage.module.css';
import bg from '../../assets/images/auth_bg.jpg';
import image from '../../assets/images/forgotPassword.png'
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { requestValidationKey } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../redux/userSlice'; 


export default function ForgotPassowrdPage() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  async function handleSubmit(event: any){

    if (!isValidEmail(event.target.value)) {
      setError("Required field, invalid email format.");
    } else {
      setError("");
    }  

    const requestBody = {
      email: email
    };
    try { 
      await requestValidationKey(requestBody)

      dispatch(loginAction({
        id: 0,
        first_name: '',
        last_name: '',
        email: requestBody.email,
        password: '',
        token: '',
      }));

      navigate('/sendCode', {state: {isFromForgotPassword: true}})
    }
    catch (error: any) { setError(error.response ? error.response.data.message : "User does not exist"); }
  }

  
  return (
    <>
      <div  style={{ backgroundImage: `url(${bg})`}} className={styles.background}>
        <div className={styles.root}>
          <Link  to="/login" className={styles.backArrow}><FiArrowLeftCircle/></Link>
          <img src={image} alt="" className={styles.img} />
          <input type="text" className={`${styles.emailInput} ${error && styles.errorInput}`} placeholder="Email address" value={email} onChange={handleEmailChange} />
          {error && <p className={styles.errorText}>{error}</p>}
          <button className={styles.btn} disabled={!isValidEmail(email)} onClick={handleSubmit}>Send email</button>
        </div>
      </div>
    </>
  );
}
