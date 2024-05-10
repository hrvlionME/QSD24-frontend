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
  )
}
