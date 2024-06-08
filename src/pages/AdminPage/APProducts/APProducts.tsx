import { useEffect, useState } from 'react'
import Select from 'react-select'
import { FaCirclePlus } from 'react-icons/fa6'
import styles from './APProducts.module.css'
import { LuPenLine, LuTrash } from 'react-icons/lu'
import APDeleteModal from '../APDeleteModal/APDeleteModal'
import { addProduct, editProduct, getProducts, deleteProduct } from '../../../services/products'
import { FiXCircle } from 'react-icons/fi'
import { getCategories } from '../../../services/categories'
import { getBrands } from '../../../services/brands'
import { getSizes } from '../../../services/sizes'
import { getColors } from '../../../services/colors'

export default function APProducts() {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [data, setData] = useState([]);
  const [operation, setOperation] = useState("");
  const [tempId, setTempId] = useState(0);
  const [tempValues, setTempValues] = useState({});
  const fetchData = async () => setData(await getProducts());
  const [error, setError] = useState(null);

  useEffect(() => {
    try { fetchData() }
    catch (err: any) { setError(err) }
  }, []);

  async function formSubmit() {
    if (operation === "add") {
      try { await addProduct({ }) }
      catch (err: any) { setError(err) }
    }
    // else if (operation === "edit") {
    //   try { await editProduct({ id: tempId, name: inputValue }) }
    //   catch (err: any) { setError(err) }
    // }
    else {
      try { await deleteProduct(tempId) }
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
        <div className={styles.buttonText}>Add new product</div>
      </div>
      <div className={styles.table}>
        <div className={styles.row} style={{ fontWeight: "700", padding: "20px" }}>
          <div className={styles.cellId}>ID</div>
          <div className={styles.cell} style={{ marginLeft: "20px" }}>Name</div>
          <div className={styles.cell} style={{ marginLeft: "-30px" }}>Created at</div>
          <div className={styles.cell} style={{ marginLeft: "-30px" }}>First image</div>
          <div className={styles.cell}>Options</div>
        </div>
        {data.map((item: any) => (
          <div className={styles.row}>
          <div className={styles.cellId}>{item.id}</div>
          <div className={styles.cell} style={{ marginLeft: "20px" }}>{item.name}</div>
          <div className={styles.cell} style={{ marginLeft: "-30px" }}>{formatDate(item.created_at)}</div>
          <div className={styles.cell} style={{ marginLeft: "-30px" }}><img src={item.images.name} alt="" style={{ width: "80px", height: "80px" }} /></div>
          <div className={`${styles.cell} ${styles.cellButtons}`}>
            <div className={styles.actionButton} style={{ backgroundColor: "green" }} onClick={() => { setShowAddEditModal(true); setOperation("edit"); setTempId(item.id); setTempValues(item) }}>
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
      {showAddEditModal && <APAddEditModal values={tempValues} operation={operation} formSubmit={formSubmit} setShowModal={setShowAddEditModal} />}
      {showDeleteModal && <APDeleteModal formSubmit={formSubmit} setShowModal={setShowDeleteModal} />}
    </>
  )
}

// Modal

function APAddEditModal ({ values, formSubmit, operation, setShowModal }: any) {
  const [selectedValues, setSelectedValues] = useState<any>({
    productName: (operation === "edit") ? values.name : "",
    productPrice: (operation === "edit") ? values.price : "",
    productGender: (operation === "edit") ? values.gender : 0,
    productCategory: (operation === "edit") ? values.category : 0,
    productBrand: (operation === "edit") ? values.brand : 0,
    productSize: (operation === "edit") ? values.size : 0,
    productDescription: (operation === "edit") ? values.description : "",
    selectedGender: (operation === "edit") ? values.gender : null,
  });
  const [categories, setCategories] = useState<any>([]);
  const [brands, setBrands] = useState<any>([]);
  const [sizes, setSizes] = useState<any>([]);
  const [colors, setColors] = useState<any>([]);
  const genders = ([{ value: 1, label: "Men" }, { value: 2, label: "Women" }, { value: 3, label: "Children" }]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    try { fetchData() }
    catch (err: any) { setError(err) }
  }, []);

  const fetchData = async () => {
    try {
      setCategories((await getCategories()).map((item: any) => ({ value: item.id, label: item.name })));
      setBrands((await getBrands()).map((item: any) => ({ value: item.id, label: item.name })));
      setSizes((await getSizes()).map((item: any) => ({ value: item.id, label: item.name })));
      setColors((await getColors()).map((item: any) => ({ value: item.id, label: item.name })));
    }
    catch (err: any) { setError(err) }
  };

  return (
    <div className={styles.modal}>
      <FiXCircle className={styles.xButton} onClick={() => setShowModal(false)} />
      <div className={styles.text}>Enter product name:</div>
      <input type="text" className={styles.input} placeholder="Product name" value={selectedValues.productName} onChange={(event) => setSelectedValues({...selectedValues, productName: event.target.value})} />
      <div className={styles.text}>Enter product price in $:</div>
      <input type="number" className={styles.input} placeholder="Product price" value={selectedValues.productPrice} onChange={(event) => setSelectedValues({...selectedValues, productPrice: event.target.value})} />
      <div className={styles.text}>Select gender:</div>
      <Select options={genders} className={styles.selectInput} defaultValue={ selectedValues.productGender && { value: selectedValues.productGender, label: genders[selectedValues.productGender - 1]?.label }} onChange={(event: any) => setSelectedValues({...selectedValues, selectedGender: event.value})} />
      <div className={styles.text}>Select categories:</div>
      <Select options={categories} className={styles.selectInput} isMulti />
      <div className={styles.text}>Select brand:</div>
      <Select options={brands} className={styles.selectInput} />
      <div className={styles.text}>Select sizes:</div>
      <Select options={sizes} className={styles.selectInput} isMulti />
      <div className={styles.text}>Description:</div>
      <textarea className={styles.input} placeholder="Product description" rows={3} value={selectedValues.productDescription} onChange={(event) => setSelectedValues({...selectedValues, productDescription: event.target.value})} />
      <div className={styles.buttons}>
        <button className={styles.button} style={{ backgroundColor: "red" }} onClick={() => setShowModal(false)}>Cancel</button>
        <button className={styles.button} style={{ backgroundColor: "green" }} onClick={() => { formSubmit(selectedValues); setShowModal(false)}}>Confirm</button>
      </div>
    </div>
  )
}
