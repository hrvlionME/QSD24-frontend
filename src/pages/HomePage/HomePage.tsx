import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'
import womenImg from '../../assets/images/women.webp'
import menImg from '../../assets/images/men.webp'
import childrenImg from '../../assets/images/children.webp'

export default function HomePage() {
  return (
    <>
      <div className={styles.heroSection}>
        <div className={`${styles.heroText} ${styles.heroSmText}`}>IN THE MOOD FOR NEW</div>
        <div className={`${styles.heroText} ${styles.heroLgText}`}>STYLE</div>
        <Link to="shop/all/1" className={styles.heroButton}>SHOP NOW</Link>
      </div>
      <div className={styles.categorySection}>
        <Link to="shop/women/1" className={styles.categoryLink} style={{ backgroundImage: `url(${womenImg})` }}>
          <div className={styles.categoryLinkText}>WOMEN</div>
        </Link>
        <Link to="shop/men/1" className={styles.categoryLink} style={{ backgroundImage: `url(${menImg})` }}>
          <div className={styles.categoryLinkText}>MEN</div>
        </Link>
        <Link to="shop/children/1" className={styles.categoryLink} style={{ backgroundImage: `url(${childrenImg})` }}>
          <div className={styles.categoryLinkText}>CHILDREN</div>
        </Link>
      </div>
    </>
  )
}
