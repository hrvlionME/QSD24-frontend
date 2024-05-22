import Footer from "../../../components/Footer/Footer";
import styles from "./UPEditProfilePage.module.css";
import UPTitle from '../UPTitle/UPTitle';
import UPNav from '../UPNav/UPNav';

export default function UPEditProfilePage() {
  return (
    <div style={{ backgroundColor: "var(--primary-color-2)" }}>
      <UPTitle />
      <div className={styles.page}>
        <UPNav active="2" />
        <div className={styles.content}>
          <div style={{ letterSpacing: "1px" }}>Dear <strong>userName</strong>, to update your data, please locate the specific field that you wish to modify and input the new value.</div>
          <div className={styles.dataSection}>
            <div className={styles.data}>
              <span>First name:</span>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.data}>
              <span>Last name:</span>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.data}>
              <span>Email address:</span>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.data}>
              <span>City:</span>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.data}>
              <span>Zip code:</span>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.data}>
              <span>Address:</span>
              <input type="text" className={styles.input} />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>Edit Profile</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
