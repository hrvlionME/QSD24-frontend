import styles from "./APDeleteModal.module.css"

export default function APDeleteModal({ setShowModal }) {
    return (
        <div className={styles.modal}>
            <div className={styles.title}>Are you sure?</div>
            <div className={styles.buttons}>
                <button className={styles.button} style={{ backgroundColor: "black" }} onClick={() => setShowModal(false)}>No</button>
                <button className={styles.button} style={{ backgroundColor: "red" }}>Yes, Delete it!</button>
            </div>
        </div>
    )
}
