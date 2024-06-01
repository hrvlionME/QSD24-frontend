import { useState } from "react";
import styles from "./APAddEditModal.module.css"

export default function APModal({ value, formSubmit, operation, setShowModal }: any) {
    const [inputValue, setInputValue] = useState(operation === "add" ? "" : value);

    return (
        <div className={styles.modal}>
            <div className={styles.title}>{operation === "add" ? "Add the new value" : "Edit the field value"}</div>
            <div className={styles.subtitle}>Name</div>
            <input type="text" className={styles.input} value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
            <div className={styles.buttons}>
                <button className={styles.button} style={{ backgroundColor: "red" }} onClick={() => setShowModal(false)}>Cancel</button>
                <button className={styles.button} style={{ backgroundColor: "green" }} onClick={() => { formSubmit(inputValue); setShowModal(false)}}>Confirm</button>
            </div>
        </div>
    )
}
