import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from './SignupPage.module.css'
import image from '../../assets/images/avatar-removebg-preview.png'
import bgImg from '../../assets/images/auth_bg.jpg';
import { register } from '../../services/auth';
import { BallTriangle } from 'react-loader-spinner';

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function validateEmail(event: any) {
    setEmail(event.target.value);
    const re = /\S+@\S+\.\S+/;
    setIsValidEmail(re.test(event.target.value));
  }

  function validatePassword(event: any) {
    setPassword(event.target.value);
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidPassword(re.test(event.target.value));
  }

  function validatePasswordConfirm(event: any) {
    setPasswordConfirm(event.target.value);
    setIsValidPasswordConfirm(password === event.target.value);
  }

  async function formSubmit() {
    setLoading(true);
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: passwordConfirm
    };
   
    try { 
      await register(requestBody)
      navigate('/login'); 
    }
    catch (err: any) { 
      setLoading(false);
      setError(err) 
    }
  }

  return (
    <div className={styles.bgImg} style={{ backgroundImage: `url(${bgImg})` }}>
      <div className={styles.box}>
        <img src={image} alt="login" style={{ width: "100%" }} />
        <div className={styles.inputGroup}>
          <input type="text" onChange={(event) => setFirstName(event.target.value)} className={`${styles.input} ${styles.inputGroupInput}`} placeholder="First name" spellCheck="false" required />
          <input type="text" onChange={(event) => setLastName(event.target.value)} className={`${styles.input} ${styles.inputGroupInput}`} placeholder="Last name" spellCheck="false" required />
        </div>
        <input type="text" className={`${styles.input} ${isValidEmail ? styles.validInput : styles.invalidInput}`} onChange={validateEmail} placeholder="Email address" spellCheck="false" required />
        {!isValidEmail && <p className={styles.errorMessage}>Required field, invalid email format.</p>}
        <div style={{ position: "relative" }}>
          <input type={showPassword ? "text" : "password"} onChange={validatePassword} className={`${styles.input} ${isValidPassword ? styles.validInput : styles.invalidInput}`} placeholder="Password" spellCheck="false" required />
          {showPassword ?
            <AiFillEyeInvisible onClick={() => setShowPassword(prev => !prev)} className={styles.icon} /> :
            <AiFillEye onClick={() => setShowPassword(prev => !prev)} className={styles.icon} />
          }
        </div>
        {!isValidPassword && <p className={styles.errorMessage}>Password must have at least 8 characters, one capital letter, one small letter, one number, and one special character.</p>}
        <div style={{ position: "relative" }}>
          <input type={showPasswordConfirm ? "text" : "password"} onChange={validatePasswordConfirm} className={`${styles.input} ${isValidPasswordConfirm ? styles.validInput : styles.invalidInput}`} placeholder="Confirm password" spellCheck="false" required />
          {showPasswordConfirm ?
            <AiFillEyeInvisible onClick={() => setShowPasswordConfirm(prev => !prev)} className={styles.icon} /> :
            <AiFillEye onClick={() => setShowPasswordConfirm(prev => !prev)} className={styles.icon} />
          }
        </div>
        {!isValidPasswordConfirm && <p className={styles.errorMessage}>Required field, must coincide to password.</p>}
        <button onClick={formSubmit} className={`${styles.button} ${isValidEmail && isValidPassword && isValidPasswordConfirm ? styles.validButton : styles.invalidButton}`} disabled={!isValidEmail || !isValidPassword}>Register</button>
        <div className={styles.links}>
          <Link to="/login" className={styles.link}>Go to Login</Link>
          <Link to="/forgot-password" className={styles.link}>Forgot password?</Link>
        </div>
      </div>
      {loading && 
      <div className={styles.loader}>
      <BallTriangle
        height={80}
        width={80}
        radius={5}
        color="#2573E7"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
      </div>
      }
    </div>
  )
}
