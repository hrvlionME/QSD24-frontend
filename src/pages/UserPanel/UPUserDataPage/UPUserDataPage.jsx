import { Link } from 'react-router-dom'
import Footer from "../../../components/Footer/Footer";
import styles from "./UPUserDataPage.module.css";
import { FaRegHeart } from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import UPTitle from '../UPTitle/UPTitle';
import UPNav from '../UPNav/UPNav';

export default function UPUserDataPage() {
  return (
    <div style={{ backgroundColor: "var(--primary-color-2)" }}>
      <UPTitle />
      <div className={styles.page}>
        <UPNav active="1" />
        <div className={styles.content}>
          <div className={styles.buttonsSection}>
            <div>
              <Link to="/profile/favorites">
                <button className={styles.button}><FaRegHeart /></button>
              </Link>
              <div className={styles.buttonText}>Favorites</div>
            </div>
            <div>
              <Link to="/profile/my-orders">
                <button className={styles.button}><GiDeliveryDrone /></button>
              </Link>
              <div className={styles.buttonText}>My Orders</div>
            </div>
          </div>
          <div className={styles.dataSection}>
            <div className={styles.data}>
              <span>Full name:</span>
              <input type="text" className={styles.input} disabled />
            </div>
            <div className={styles.data}>
              <span>Email address:</span>
              <input type="text" className={styles.input} disabled />
            </div>
            <div className={styles.data}>
              <span>City:</span>
              <input type="text" className={styles.input} disabled />
            </div>
            <div className={styles.data}>
              <span>Zip code:</span>
              <input type="text" className={styles.input} disabled />
            </div>
            <div className={styles.data}>
              <span>Address:</span>
              <input type="text" className={styles.input} disabled />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
