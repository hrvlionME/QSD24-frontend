import UserPanel from "../UserPanel"
import Card from "../../../components/Card/Card"
import styles from "./UPFavoritesPage.module.css"
import Footer from "../../../components/Footer/Footer"

export default function UPFavoritesPage() {
  return (
    <>
      <UserPanel />
      <div className={styles.content}>
        <Card />
      </div>
      <Footer />
    </>
  )
}
