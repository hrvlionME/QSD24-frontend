import { Link } from 'react-router-dom'
import styles from './UPNav.module.css'

export default function UPNav({ active }) {
  return (
    <div className={styles.nav}>
      <div className={styles.listTitle}>USER PANEL</div>
      <ul className={styles.list}>
        <li className={active === "1" && styles.active}><Link to="/profile" className={styles.link}>User Data</Link></li>
        <li className={active === "2" && styles.active}><Link to="/profile/edit-profile" className={styles.link}>Edit Profile</Link></li>
        <li className={active === "3" && styles.active}><Link to="/profile/change-password" className={styles.link}>Change Password</Link></li>
        <li className={active === "4" && styles.active}><Link to="/profile/my-orders" className={styles.link}>My Orders</Link></li>
        <li className={active === "5" && styles.active}><Link to="/profile/favorites" className={styles.link}>Favorites</Link></li>
      </ul>
    </div>
  )
}
