import { Link } from 'react-router-dom'
import styles from './UserPanel.module.css'

export default function UserPanel() {
  return (
    <div className={styles.page}>
      <div className={styles.title}>MY ACCOUNT</div>
      <div className={styles.nav}>
        <div className={styles.listTitle}>USER PANEL</div>
        <ul className={styles.list}>
          <li><Link to="/profile/profile" className={styles.link}>Profile</Link></li>
          <li><Link to="/profile/edit-profile" className={styles.link}>Edit Profile</Link></li>
          <li><Link to="/profile/change-password" className={styles.link}>Change Password</Link></li>
          <li><Link to="/profile/my-orders" className={styles.link}>My Orders</Link></li>
          <li><Link to="/profile/favorites" className={styles.link}>Favorites</Link></li>
        </ul>
      </div>
    </div>
  )
}
