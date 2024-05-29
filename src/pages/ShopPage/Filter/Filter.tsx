import { useState, useEffect } from 'react';
import styles from './Filter.module.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiXCircle } from "react-icons/fi";
import MultiRangeSlider from "multi-range-slider-react";
import { getCategories, getBrands, getSizes, getColors } from '../../../services/filter';

export default function Filter({ filterItems, setFilterItems, priceRange, setPriceRange }: any) {
    const [isExpended, setIsExpended] = useState([true, true, true, true]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [error, setError] = useState(null);

    function addItemFilter(item: string) {
        if(filterItems.includes(item)) setFilterItems(filterItems.filter((i: string) => i !== item))
        else setFilterItems([...filterItems, item]);
    }

    function resetFilter() {
        setPriceRange([0, 5000]);
        setFilterItems([]);
    }

    useEffect(() => {
        const fetchData = async () => {
            setCategories(await getCategories());
            setBrands(await getBrands());
            setSizes(await getSizes());
            setColors(await getColors());
        };
        try { fetchData() }
        catch (err: any) { setError(err) }
    }, []);

    return (
        <div className={styles.filter}>
            <div>
                <div className={styles.category} onClick={() => setIsExpended([!isExpended[0], isExpended[1], isExpended[2], isExpended[3]])}>
                    <span>Category</span>
                    {isExpended[0] && <IoIosArrowUp />}
                    {!isExpended[0] && <IoIosArrowDown />}
                </div>
                {isExpended[0] && <div className={styles.subCategoryBox}>
                    {categories.map((item: any) => (
                        <div className={`${styles.subcategory} ${filterItems.includes(item.name) && styles.active}`} onClick={() => addItemFilter(item.name)}>{item.name}</div>
                    ))}
                </div>}
            </div>
            <div>
            <div className={styles.category} onClick={() => setIsExpended([isExpended[0], !isExpended[1], isExpended[2], isExpended[3]])}>
                <span>Brand</span>
                {isExpended[1] && <IoIosArrowUp />}
                {!isExpended[1] && <IoIosArrowDown />}
            </div>
                {isExpended[1] && <div className={styles.subCategoryBox}>
                    {brands.map((item: any) => (
                        <div className={`${styles.subcategory} ${filterItems.includes(item.name) && styles.active}`} onClick={() => addItemFilter(item.name)}>{item.name}</div>
                    ))}
                </div>}
            </div>
            <div>
            <div className={styles.category} onClick={() => setIsExpended([isExpended[0], isExpended[1], !isExpended[2], isExpended[3]])}>
                <span>Size</span>
                {isExpended[2] && <IoIosArrowUp />}
                {!isExpended[2] && <IoIosArrowDown />}
            </div>
                {isExpended[2] && <div className={styles.subCategoryBox}>
                    {sizes.map((item: any) => (
                        <div className={`${styles.subcategory} ${filterItems.includes(item.name) && styles.active}`} onClick={() => addItemFilter(item.name)}>{item.name}</div>
                    ))}
                </div>}
            </div>
            <div>
            <div className={styles.category} onClick={() => setIsExpended([isExpended[0], isExpended[1], isExpended[2], !isExpended[3]])}>
                <span>Color</span>
                {isExpended[3] && <IoIosArrowUp />}
                {!isExpended[3] && <IoIosArrowDown />}
            </div>
                {isExpended[3] && <div className={styles.subCategoryBox}>
                    {colors.map((item: any) => (
                        <div className={`${styles.subcategory} ${filterItems.includes(item.name) && styles.active}`} onClick={() => addItemFilter(item.name)}>{item.name}</div>
                    ))}
                </div>}
            </div>
            <div className={styles.text}>Price Range: ${priceRange[0]} - ${priceRange[1]}</div>
            <MultiRangeSlider className={styles.slider} min={0} max={5000} ruler={false} label={false} minValue={priceRange[0]} maxValue={priceRange[1]} barInnerColor={"blue"} onChange={(event) => setPriceRange([event.minValue, event.maxValue])} />
            {(filterItems.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000) &&
                <div className={`${styles.resetButton} ${styles.xButton}`} onClick={resetFilter}>
                    <FiXCircle />
                    <div>Reset All</div>
                </div>
            }
        </div>
    )
}
