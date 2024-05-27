import { useParams } from "react-router-dom";
import Filter from "./Filter/Filter";
import Footer from "../../components/Footer/Footer";
import styles from "./ShopPage.module.css";

export default function ShopPage() {
  const { category, id } = useParams();

  return (
    <>
      <div className={styles.page}>
        <Filter />
        <div>
          <h1>Shop Page</h1>
          <p>Category: {category}</p>
          <p>Page: {id}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};
