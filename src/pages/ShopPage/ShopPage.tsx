import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Filter from "./Filter/Filter";
import Footer from "../../components/Footer/Footer";
import styles from "./ShopPage.module.css";
import { FaFilter } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import Card from "../../components/Card/Card";
import { filterProducts } from "../../services/products";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSearchTerm } from "../../redux/searchSlice";

export default function ShopPage() {
  const { t } = useTranslation();
  const { category, id } = useParams();
  const [showFilter, setShowFilter] = useState(window.innerWidth > 768 ? true : false);
  const [products, setProducts] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const fetchedProducts = await filterProducts(
      priceRange[0],
      priceRange[1],
      selectedCategories,
      selectedBrands,
      selectedSizes,
      selectedColors,
      category
    );
    const filteredProducts = fetchedProducts.filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  }
  
  useEffect(() => {
    setLoading(true);
    try { fetchData() }
    catch (err: any) { setError(err) }
    const resizeListener = () => { window.innerWidth > 768 ? setShowFilter(true) : setShowFilter(false) }
    window.addEventListener("resize", resizeListener);
    setLoading(false);
    return () => { window.removeEventListener("resize", resizeListener); }
  }, [category, priceRange, selectedCategories, selectedBrands, selectedSizes, selectedColors, searchTerm]);

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [])

  return (
    <>
       {loading ? <div className={styles.loader}><Circles color="#6C63FF" height={60} width={60}/></div> : <div>
      <div className={styles.page}>
        <div style={{ display: showFilter ? "flex" : "none" }}>
          <Filter
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
          />
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
          ))}
          </div>
          <div className={styles.cards}>
            {products.map((item: any) => (
              <Card key={item?.id} id={item?.id} title={item?.name} description={item?.description} price={item?.price} numberOfStars={item?.average_rating} image={item?.images?.name} />)
            )}
          </div>
        </div>
      </div>
      <Footer />
      </div>}
    </>
  );
};
