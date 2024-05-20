import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'
import NewInThisWeek from "./NewInThisWeek/NewInThisWeek";
import Footer from "../../components/Footer/Footer";
import womenImg from '../../assets/images/women.webp'
import menImg from '../../assets/images/men.webp'
import childrenImg from '../../assets/images/children.webp'
import ChatComponent from '../../components/ChatComponent/ChatComponent';

export default function HomePage() {
  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.heroImage}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroSmText}>IN THE MOOD FOR NEW</div>
          <div className={styles.heroLgText}>STYLE</div>
          <Link to="shop/all/1" className={styles.heroButton}>SHOP NOW</Link>
        </div>
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
      <div className={styles.misionVisionSection}>
        <div className={styles.misionVisionImage}></div>
        <div className={styles.misionVisionBoxWrapper}>
          <div className={styles.misionVisionBox}>
            <div className={styles.misionVisionTitle}>- QSD Shop -</div>
            <div className={styles.misionVisionText}>
              <div>Our mission is to provide our customers with a seamless online shopping experience for high-quality, stylish clothing that empowers them to look and feel their best. We are committed to offering a wide range of modern clothing options that are both functional and fashionable, and we aim to make our customers lives easier by delivering exceptional service and exceptional products at affordable prices.</div>
              <div>Our vision is to become the go-to online destination for quality and modern clothing that inspires confidence and individuality. We strive to be a trusted source for fashion-forward individuals who value style and substance in their clothing choices. By continuously innovating and adapting to changing fashion trends, we aim to remain at the forefront of the online fashion industry, while maintaining our commitment to providing excellent customer service and high-quality products.</div>
            </div>
          </div>
        </div>
      </div>
      <NewInThisWeek></NewInThisWeek>
      <Footer />
      <ChatComponent />
    </>
  )
}
