import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className={styles.main}>
        <div className={styles.align}>
            <hr />
            <div className={styles.align} style={{ justifyContent: "center" }}>
                <Link to="https://www.facebook.com/qsd.ba/" className={styles.icon}><FaFacebook /></Link>
                <Link to="https://www.instagram.com/qsd.ba/" className={styles.icon}><FaInstagram /></Link>
                <Link to="https://twitter.com/qsdbih" className={styles.icon}><FaXTwitter /></Link>
                <Link to="https://www.linkedin.com/company/qsdbih/mycompany/" className={styles.icon}><FaLinkedin /></Link>
                <Link to="https://www.tiktok.com/@qsd.ba?lang=en" className={styles.icon}><FaTiktok /></Link>
            </div>
            <hr />
        </div>
        <div className={styles.info}>
            <div className={styles.infoColumn}>
                <strong>QSD BiH d.o.o</strong>
                <div style={{ marginTop: "7px" }}>hello@qsd.ba</div>
                <div>Dr. Ante Starčevića bb, Mostar, Bosnia and Herzegovina</div>
                <div>direct +387 36 446 089 (BH)</div>
                <div>USA +1 347 352 8633 (NY)</div>
                <div>UK +44 20 3290 1563 (LND)</div>
            </div>
            <div className={styles.infoColumn}>
                <strong>Customer support</strong>
                <div style={{ marginTop: "7px" }}><Link className={styles.link} to="/faq">Frequently asked questions</Link></div>
                <div><Link className={styles.link} to="/contact-us">Contact us</Link></div>
            </div>
            <div className={styles.infoColumn}>
                <strong>Legal agreement</strong>
                <div style={{ marginTop: "7px" }}><Link className={styles.link} to="#">Privacy Policy</Link></div>
                <div><Link className={styles.link} to="#">Cookies Policy</Link></div>
                <div><Link className={styles.link} to="#">Terms of Use</Link></div>
            </div>
        </div>
        <hr />
        <div style={{ marginTop: "15px" }}>Copyright © 2024 QSD BH. All Rights Reserved</div>
    </div>
  )
}
