import { useState } from 'react';
import styles from './Filter.module.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

export default function Filter() {
    const [isExpended, setIsExpended] = useState([true, true, true, true]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);

    function handleInput(event: any) {
        setMinPrice(event.minValue);
        setMaxPrice(event.maxValue);
    }

    return (
        <div className={styles.filter}>
            <div>
                <div className={styles.category} onClick={() => setIsExpended([!isExpended[0], isExpended[1], isExpended[2], isExpended[3]])}>
                    <span>Category</span>
                    {isExpended[0] && <IoIosArrowUp />}
                    {!isExpended[0] && <IoIosArrowDown />}
                </div>
                {isExpended[0] && <div className={styles.subCategoryBox}>
                    {[0,1,2,3].map(() => (
                        <div className={styles.subcategory}>Subcategory</div>
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
                    {[0,1,2,3].map(() => (
                        <div className={styles.subcategory}>Subcategory</div>
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
                    {[0,1,2,3].map(() => (
                        <div className={styles.subcategory}>Subcategory</div>
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
                    {[0,1,2,3].map(() => (
                        <div className={styles.subcategory}>Subcategory</div>
                    ))}
                </div>}
            </div>
            <div className={styles.text}>Price Range: ${minPrice} - ${maxPrice}</div>
            <MultiRangeSlider className={styles.slider} min={0} max={5000} ruler={false} label={false} minValue={minPrice} maxValue={maxPrice} barInnerColor={"blue"} onInput={handleInput} />
        </div>
    )
}
