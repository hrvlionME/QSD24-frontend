import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer'
import styles from './FavoritesPage.module.css'

export default function FavoritesPage() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Favorites</div>
        </div>
        <div className={styles.cards}>
          <Card />
        </div>
      </div>
      <Footer />
    </>
  );
}
