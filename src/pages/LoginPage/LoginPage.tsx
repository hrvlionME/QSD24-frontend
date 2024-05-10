<<<<<<< HEAD
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from './LoginPage.module.css'
import image from '../../assets/images/login-removebg-preview.png'
import bgImg from '../../assets/images/auth_bg.jpg';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  function validateEmail(event: any) {
    const email = event.target.value;
    const re = /\S+@\S+\.\S+/;
    setIsValidEmail(re.test(email));
  }

  function validatePassword(event: any) {
    const password = event.target.value;
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidPassword(re.test(password));
  }

  return (
    <div className={styles.bgImg} style={{ backgroundImage: `url(${bgImg})` }}>
      <div className={styles.box}>
        <img src={image} alt="login" style={{ width: "100%" }} />
        <input type="text" className={`${styles.input} ${isValidEmail ? styles.validInput : styles.invalidInput}`} onChange={validateEmail} placeholder="Email address" autoComplete="off" spellCheck="false" required />
        {!isValidEmail && <p className={styles.errorMessage}>Required field, invalid email format.</p>}
        <div style={{ position: "relative" }}>
          <input type={showPassword ? "text" : "password"} className={`${styles.input} ${isValidPassword ? styles.validInput : styles.invalidInput}`} onChange={validatePassword} placeholder="Password" autoComplete="off" spellCheck="false" required />
          {showPassword ?
            <AiFillEyeInvisible onClick={() => setShowPassword(prev => !prev)} className={styles.icon} /> :
            <AiFillEye onClick={() => setShowPassword(prev => !prev)} className={styles.icon} />
          }
        </div>
        {!isValidPassword && <p className={styles.errorMessage}>Password must have at least 8 characters, one capital letter, one small letter, one number, and one special character.</p>}
        <input type="button" className={`${styles.button} ${isValidEmail && isValidPassword ? styles.validButton : styles.invalidButton}`} value="Login" disabled={!isValidEmail || !isValidPassword} />
        <div className={styles.links}>
          <Link to="/signup" className={styles.link}>Go to Sign Up</Link>
          <Link to="/forgot-password" className={styles.link}>Forgot password?</Link>
        </div>
      </div>
    </div>
=======
import { Link } from 'react-router-dom'
import styles from './LoginPage.module.css'
import image from '../../assets/images/login-removebg-preview.png'

export default function LoginPage() {
  return (
    <>
      <img src={image} alt="login" className={styles.image} />
      <input type="text" className={styles.input} placeholder="Email address" />
      <input type="password" className={styles.input} placeholder="Password" />
      <input type="button" className={styles.button} value="Login" />
      <div className={styles.links}>
        <Link to="/signup" className={styles.link}>Go to Sign Up</Link>
        <Link to="/forgot-password" className={styles.link}>Forgot password?</Link>
      </div>
    </>
>>>>>>> f322c5b (Created login page)
  )
}
