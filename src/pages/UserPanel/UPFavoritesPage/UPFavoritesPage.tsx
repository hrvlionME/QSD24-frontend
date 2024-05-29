import UPNav from "../UPNav/UPNav"
import UPTitle from "../UPTitle/UPTitle"
import styles from "./UPFavoritesPage.module.css"
import Footer from "../../../components/Footer/Footer"

export default function UPFavoritesPage() {
  return (
    <div style={{ backgroundColor: "var(--primary-color-2)" }}>
      <UPTitle />
      <div className={styles.page}>
        <UPNav active="5" />
        <div className={styles.content}>
          <div style={{ fontWeight: "600" }}>You don't have any products in your favorites.</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
