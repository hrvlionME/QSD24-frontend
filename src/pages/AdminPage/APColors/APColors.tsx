import { useEffect, useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import styles from './APColors.module.css'
import { LuPenLine, LuTrash } from 'react-icons/lu'
import APDeleteModal from '../APDeleteModal/APDeleteModal'
import { getColors, addColor, editColor, deleteColor } from '../../../services/colors'
import APAddEditModal from '../APAddEditModal/APAddEditModal'

export default function APColors() {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [data, setData] = useState([]);
  const [operation, setOperation] = useState("");
  const [tempId, setTempId] = useState(0);
  const [tempValue, setTempValue] = useState("");
  const [tempColor, setTempColor] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    try { fetchData() }
    catch (err: any) { setError(err) }
  }, []);

  async function fetchData () {
    setData(await getColors());
  };

  async function formSubmit(inputValue: string) {
    if (operation === "add") {
      try { await addColor({ name: inputValue }) }
      catch (err: any) { setError(err) }
    }
    else if (operation === "edit") {
      try { await editColor({ id: tempId, name: inputValue }) }
      catch (err: any) { setError(err) }
    }
    else {
      try { await deleteColor(tempId) }
      catch (err: any) { setError(err) }
    }
    fetchData();
  }

  function formatDate(date: string) {
    const d = new Date(date);
    return `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${(d.getMonth() < 9) ? `0${d.getMonth() + 1}` : d.getMonth() + 1}.${d.getFullYear()} ${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
  }

  return (
    <>
      <div className={styles.addButton} onClick={() => { setShowAddEditModal(true); setOperation("add") }}>
        <FaCirclePlus />
        <div className={styles.buttonText}>Add new color</div>
      </div>
      <div className={styles.table}>
        <div className={styles.row} style={{ fontWeight: "700", padding: "20px" }}>
          <div className={styles.cellId}>ID</div>
          <div className={styles.cell}>Name</div>
          <div className={styles.cell} style={{ marginLeft: "-70px" }}>Color</div>
          <div className={styles.cell} style={{ marginLeft: "-60px" }}>Created at</div>
          <div className={styles.cell} style={{ marginLeft: "30px" }}>Options</div>
        </div>
        {data.map((item: any) => (
          <div className={styles.row}>
          <div className={styles.cellId}>{item.id}</div>
          <div className={styles.cell}>{item.name}</div>
          <div className={styles.cell} style={{ marginLeft: "-70px" }}>
            <div className={styles.colorWrapper} style={{ backgroundColor: item.hex_code }}></div>  
          </div>
          <div className={styles.cell} style={{ marginLeft: "-60px" }}>{formatDate(item.created_at)}</div>
          <div className={`${styles.cell} ${styles.cellButtons}`} style={{ marginLeft: "30px" }}>
            <div className={styles.actionButton} style={{ backgroundColor: "green" }} onClick={() => { setShowAddEditModal(true); setOperation("edit"); setTempId(item.id); setTempValue(item.name) }}>
              <div className={styles.buttonIcon} style={{ color: "green" }}><LuPenLine /></div>
              <div className={styles.buttonText}>Edit</div>
            </div>
            <div className={styles.actionButton} style={{ backgroundColor: "red" }} onClick={() => { setShowDeleteModal(true); setOperation("delete"); setTempId(item.id) }}>
              <div className={styles.buttonIcon} style={{ color: "red" }}><LuTrash /></div>
              <div className={styles.buttonText}>Delete</div>
            </div>
          </div>
        </div>
        ))}
      </div>
      {(showAddEditModal || showDeleteModal) && <div className={styles.blockContent}></div>}
      {showAddEditModal && <APAddEditModal value={tempValue} color={tempColor} operation={operation} formSubmit={formSubmit} setShowModal={setShowAddEditModal} />}
      {showDeleteModal && <APDeleteModal formSubmit={formSubmit} setShowModal={setShowDeleteModal} />}
    </>
  )
}
