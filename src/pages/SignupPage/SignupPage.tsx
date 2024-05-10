import { Link } from 'react-router-dom'
import styles from './SignupPage.module.css'
import image from '../../assets/images/avatar-removebg-preview.png'

export default function SignupPage() {
  return (
    <div className={styles.box}>
      <img src={image} alt="login" className={styles.image} />
      <div className={styles.inputGroup}>
        <input type="text" className={styles.inputGroupInput} placeholder="First name" />
        <input type="text" className={styles.inputGroupInput} placeholder="Last name" />
      </div>
      <input type="text" className={styles.input} placeholder="Email address" />
      <input type="password" className={styles.input} placeholder="Password" />
      <input type="password" className={styles.input} placeholder="Confirm password" />
      <input type="button" className={styles.button} value="Login" />
      <div className={styles.links}>
        <Link to="/login" className={styles.link}>Go to Login</Link>
        <Link to="/forgot-password" className={styles.link}>Forgot password?</Link>
      </div>
    </div>
  )
}
