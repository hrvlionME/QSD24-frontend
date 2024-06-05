import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Filter from "./Filter/Filter";
import Footer from "../../components/Footer/Footer";
import styles from "./ShopPage.module.css";
import { FaFilter } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import Card from "../../components/Card/Card";
import { getProducts } from "../../services/products";

export default function ShopPage() {
  const { t } = useTranslation();
  const { category, id } = useParams();
  const [showFilter, setShowFilter] = useState(window.innerWidth > 768 ? true : false);
  const [products, setProducts] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const genders: any = { 1: "women", 2: "men", 3: "children" };
  const fetchData = async () => setProducts(await getProducts());
  const [error, setError] = useState(false);
  
  useEffect(() => {
    try { fetchData() }
    catch(err: any) { setError(err) }
    const resizeListener = () => { window.innerWidth > 768 ? setShowFilter(true) : setShowFilter(false) }
    window.addEventListener("resize", resizeListener);
    return () => { window.removeEventListener("resize", resizeListener); }
  }, []);

  return (
    <>
      <div className={styles.page}>
        <div style={{ display: showFilter ? "flex" : "none" }}>
          <Filter filterItems={filterItems} setFilterItems={setFilterItems} priceRange={priceRange} setPriceRange={setPriceRange} />
          {window.innerWidth <= 768 && <div className={styles.blockContent} onClick={() => setShowFilter(false)}></div>}
        </div>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>{ category!.charAt(0).toUpperCase() + category!.slice(1) }</div>
            <FaFilter className={styles.filterIcon} onClick={() => setShowFilter(!showFilter)} />
          </div>
          <div className={styles.filterItems}>
          {filterItems.map((item: any) => (
            <div className={styles.filterItem} onClick={() => setFilterItems(filterItems.filter((i: any) => i !== item))}>
              <div className={styles.xButton}>
                <div>{item}</div>
                <FiXCircle />
              </div>
            </div>
            ))
          }
          </div>
          {products.length > 0 && <div className={styles.cards}>
            {products
              .filter((item: any) => (item.price >= priceRange[0] && item.price <= priceRange[1] && (category === genders[item.gender] || category === "all")
              && item.price >= priceRange[0] && item.price <= priceRange[1]))
              .map((item: any) => (<Card key={item.id} title={item.name} description={item.brands.name} price={item.price} numberOfStars={item.total_rating} image={""} />))
            }
          </div>}
        </div>
      </div>
      <Footer />
    </>
  );
};
