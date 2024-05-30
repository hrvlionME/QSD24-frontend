import { useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import styles from './APCategories.module.css'
import { LuPenLine, LuTrash } from 'react-icons/lu'
import APAddEditModal from '../APAddEditModal/APAddEditModal'
import APDeleteModal from '../APDeleteModal/APDeleteModal'

export default function APCategories() {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  return (
    <>
      <div className={styles.addButton} onClick={() => { setShowAddEditModal(true); setModalTitle("Add the new value") }}>
        <FaCirclePlus />
        <div className={styles.buttonText}>Add new category</div>
      </div>
      <div className={styles.table}>
        <div className={styles.row} style={{ fontWeight: "700" }}>
          <div className={styles.cellId}>ID</div>
          <div className={styles.cell} style={{ marginLeft: "40px" }}>Name</div>
          <div className={styles.cell} style={{ marginLeft: "-20px" }}>Created at</div>
          <div className={styles.cell}>Options</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cellId}>1</div>
          <div className={styles.cell} style={{ marginLeft: "40px" }}>Test</div>
          <div className={styles.cell} style={{ marginLeft: "-20px" }}>Test</div>
          <div className={`${styles.cell} ${styles.cellButtons}`}>
            <div className={styles.actionButton} style={{ backgroundColor: "green" }} onClick={() => { setShowAddEditModal(true); setModalTitle("Edit the field value") }}>
              <div className={styles.buttonIcon}><LuPenLine /></div>
              <div className={styles.buttonText}>Edit</div>
            </div>
            <div className={styles.actionButton} style={{ backgroundColor: "red" }} onClick={() => { setShowDeleteModal(true) }}>
              <div className={styles.buttonIcon}><LuTrash /></div>
              <div className={styles.buttonText}>Delete</div>
            </div>
          </div>
        </div>
      </div>
      {(showAddEditModal || showDeleteModal) && <div className={styles.blockContent}></div>}
      {showAddEditModal && <APAddEditModal modalTitle={modalTitle} setShowModal={setShowAddEditModal} />}
      {showDeleteModal && <APDeleteModal setShowModal={setShowDeleteModal} />}
    </>
  )
}
