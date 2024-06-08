import { useState, useEffect } from 'react';
import styles from './Filter.module.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiXCircle } from "react-icons/fi";
import MultiRangeSlider from "multi-range-slider-react";
import { getCategories } from '../../../services/categories';
import { getBrands } from '../../../services/brands';
import { getSizes } from '../../../services/sizes';
import { getColors } from '../../../services/colors';
import { useTranslation } from "react-i18next";

export default function Filter({ filterItems, setFilterItems, priceRange, setPriceRange, selectedCategories, setSelectedCategories, selectedBrands, setSelectedBrands, selectedSizes, setSelectedSizes, selectedColors, setSelectedColors }: any) {
    const { t } = useTranslation();
    const [isExpended, setIsExpended] = useState([true, true, true, true]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try { fetchData() }
        catch (err: any) { setError(err) }
    }, []);

    const fetchData = async () => {
        setCategories(await getCategories());
        setBrands(await getBrands());
        setSizes(await getSizes());
        setColors(await getColors());
    };

    function addItemFilter(id: number, name: string, category: string) {
        if (filterItems.includes(name)) setFilterItems(filterItems.filter((i: string) => i !== name));
        else setFilterItems([...filterItems, name]);
        if (category === "category") {
            if (selectedCategories.includes(id)) setSelectedCategories(selectedCategories.filter((i: number) => i !== id));
            else setSelectedCategories([...selectedCategories, id]);
        }
        else if (category === "brand") {
            if (selectedBrands.includes(id)) setSelectedBrands(selectedBrands.filter((i: number) => i !== id));
            else setSelectedBrands([...selectedBrands, id]);
        }
        else if (category === "size") {
            if (selectedSizes.includes(id)) setSelectedSizes(selectedSizes.filter((i: number) => i !== id));
            else setSelectedSizes([...selectedSizes, id]);
        }
        else if (category === "color") {
            if (selectedColors.includes(id)) setSelectedColors(selectedColors.filter((i: number) => i !== id));
            else setSelectedColors([...selectedColors, id]);
        }
    }

    function resetFilter() {
        setPriceRange([0, 5000]);
        setFilterItems([]);
    }

    return (
        <div className={styles.filter}>
            <div>
                <div className={styles.category} onClick={() => setIsExpended([!isExpended[0], isExpended[1], isExpended[2], isExpended[3]])}>
                    <span>{t("category")}</span>
                    {isExpended[0] && <IoIosArrowUp />}
                    {!isExpended[0] && <IoIosArrowDown />}
                </div>
                {isExpended[0] && <div className={styles.subCategoryBox}>
                    {categories.map((item: any) => (
                        <div className={`${styles.subcategory} ${filterItems.includes(item.name) && styles.active}`} onClick={() => addItemFilter(item.id, item.name, "category")}>{item.name}</div>
                    ))}
                </div>}
            </div>
            <div>
            <div className={styles.category} onClick={() => setIsExpended([isExpended[0], !isExpended[1], isExpended[2], isExpended[3]])}>
                <span>{t("brand")}</span>
                {isExpended[1] && <IoIosArrowUp />}
                {!isExpended[1] && <IoIosArrowDown />}
            </div>
                {isExpended[1] && <div className={styles.subCategoryBox}>
                    {brands.map((item: any) => (
                        <div className={`${styles.subcategory} ${filterItems.includes(item.name) && styles.active}`} onClick={() => addItemFilter(item.id, item.name, "brand")}>{item.name}</div>
                    ))}
                </div>}
            </div>
            <div>
            <div className={styles.category} onClick={() => setIsExpended([isExpended[0], isExpended[1], !isExpended[2], isExpended[3]])}>
                <span>{t("size")}</span>
                {isExpended[2] && <IoIosArrowUp />}
                {!isExpended[2] && <IoIosArrowDown />}
            </div>
                {isExpended[2] && <div className={styles.subCategoryBox}>
                    {sizes.map((item: any) => (
                        <div className={`${styles.subcategory} ${filterItems.includes(item.name) && styles.active}`} onClick={() => addItemFilter(item.id, item.name, "size")}>{item.name}</div>
                    ))}
                </div>}
            </div>
            <div>
            <div className={styles.category} onClick={() => setIsExpended([isExpended[0], isExpended[1], isExpended[2], !isExpended[3]])}>
                <span>{t("color")}</span>
                {isExpended[3] && <IoIosArrowUp />}
                {!isExpended[3] && <IoIosArrowDown />}
            </div>
                {isExpended[3] && <div className={styles.subCategoryBox}>
                    {colors.map((item: any) => (
                        <div className={`${styles.subcategory} ${filterItems.includes(item.name) && styles.active}`} onClick={() => addItemFilter(item.id, item.name, "color")}>{item.name}</div>
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
