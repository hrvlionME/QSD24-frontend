import styles from "./APAddEditModal.module.css"

export default function APModal({ modalTitle, setShowModal }: any) {
    return (
        <div className={styles.modal}>
            <div className={styles.title}>{modalTitle}</div>
            <div className={styles.subtitle}>Name</div>
            <input type="text" className={styles.input} />
            <div className={styles.buttons}>
                <button className={styles.button} style={{ backgroundColor: "red" }} onClick={() => setShowModal(false)}>Cancel</button>
                <button className={styles.button} style={{ backgroundColor: "green" }}>Confirm</button>
            </div>
        </div>
    )
}
