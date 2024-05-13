import { useState } from 'react';
import { Link } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from './SignupPage.module.css'
import image from '../../assets/images/avatar-removebg-preview.png'
import bgImg from '../../assets/images/auth_bg.jpg';

export default function SignupPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

  function validateEmail(event: any) {
    const email = event.target.value;
    const re = /\S+@\S+\.\S+/;
    setIsValidEmail(re.test(email));
  }

  function validatePassword(event: any) {
    const password = event.target.value;
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidPassword(re.test(password));
    setPassword(password);
  }

  function validatePasswordConfirm(event: any) {
    const passwordConfirm = event.target.value;
    setIsValidPasswordConfirm(password === passwordConfirm);
  }

  return (
    <div className={styles.bgImg} style={{ backgroundImage: `url(${bgImg})` }}>
      <div className={styles.box}>
        <img src={image} alt="login" style={{ width: "100%" }} />
        <div className={styles.inputGroup}>
          <input type="text" className={`${styles.input} ${styles.inputGroupInput}`} placeholder="First name" autoComplete="off" spellCheck="false" required />
          <input type="text" className={`${styles.input} ${styles.inputGroupInput}`} placeholder="Last name" autoComplete="off" spellCheck="false" required />
        </div>
        <input type="text" className={`${styles.input} ${isValidEmail ? styles.validInput : styles.invalidInput}`} onChange={validateEmail} placeholder="Email address" autoComplete="off" spellCheck="false" required />
        {!isValidEmail && <p className={styles.errorMessage}>Required field, invalid email format.</p>}
        <div style={{ position: "relative" }}>
          <input type={showPassword ? "text" : "password"} onChange={validatePassword} className={`${styles.input} ${isValidPassword ? styles.validInput : styles.invalidInput}`} placeholder="Password" autoComplete="off" spellCheck="false" required />
          {showPassword ?
            <AiFillEyeInvisible onClick={() => setShowPassword(prev => !prev)} className={styles.icon} /> :
            <AiFillEye onClick={() => setShowPassword(prev => !prev)} className={styles.icon} />
          }
        </div>
        {!isValidPassword && <p className={styles.errorMessage}>Password must have at least 8 characters, one capital letter, one small letter, one number, and one special character.</p>}
        <div style={{ position: "relative" }}>
          <input type={showPasswordConfirm ? "text" : "password"} onChange={validatePasswordConfirm} className={`${styles.input} ${isValidPasswordConfirm ? styles.validInput : styles.invalidInput}`} placeholder="Password" autoComplete="off" spellCheck="false" required />
          {showPasswordConfirm ?
            <AiFillEyeInvisible onClick={() => setShowPasswordConfirm(prev => !prev)} className={styles.icon} /> :
            <AiFillEye onClick={() => setShowPasswordConfirm(prev => !prev)} className={styles.icon} />
          }
        </div>
        {!isValidPasswordConfirm && <p className={styles.errorMessage}>Required field, must coincide to password.</p>}
        <input type="button" className={`${styles.button} ${isValidEmail && isValidPassword && isValidPasswordConfirm ? styles.validButton : styles.invalidButton}`} value="Login" disabled={!isValidEmail || !isValidPassword} />
        <div className={styles.links}>
          <Link to="/login" className={styles.link}>Go to Login</Link>
          <Link to="/forgot-password" className={styles.link}>Forgot password?</Link>
        </div>
      </div>
    </div>
  )
}
