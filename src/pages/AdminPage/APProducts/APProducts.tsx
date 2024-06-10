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

  async function formSubmit(selectedValues: any) {
    const formData = new FormData();
    formData.append("name", selectedValues.name);
    formData.append("description", selectedValues.description);
    formData.append("price", selectedValues.price);
    formData.append("gender", selectedValues.gender);
    formData.append("brand_id", selectedValues.brand?.id);
    formData.append("color_id", selectedValues.color?.id);
    selectedValues.categories?.forEach((category: any) => formData.append("categories[]", category?.id));
    selectedValues.sizes?.forEach((size: any, index: number) => {
      formData.append(`sizes[${index}][size_id]`, size.id);
      formData.append(`sizes[${index}][amount]`, size.amount);
    });
    selectedValues.images?.forEach((image: any, index: number) => {
      if (image instanceof File) formData.append(`images[${index}]`, image);
    });
    if (operation === "add") {
      try { await addProduct(formData) }
      catch (err: any) { setError(err) }
    }
    else if (operation === "edit") {
      try { await editProduct(formData) }
      catch (err: any) { setError(err) }
    }
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
          <div className={styles.cell} style={{ marginLeft: "-30px" }}><img src={`http://127.0.0.1:8000/storage/products/${item.images[0].name}`} alt="" style={{ width: "80px", height: "80px" }} /></div>
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
    name: (operation === "edit") ? values.name : "",
    price: (operation === "edit") ? values.price : "",
    gender: (operation === "edit") ? values.gender : 0,
    categories: (operation === "edit") ? values.categories : [],
    brand: (operation === "edit") ? values.brands : 0,
    sizes: (operation === "edit") ? values.sizes : [],
    color: (operation === "edit") ? values.color : 0,
    description: (operation === "edit") ? values.description : "",
    images: (operation === "edit") ? values.images : []
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

  const handleFileChange = (event: any) => {
    const files = event.target.files;
    setSelectedValues((prevValues: any) => ({
      ...prevValues,
      images: Array.from(files)
    }));
  };

  return (
    <div className={styles.modal}>
      <FiXCircle className={styles.xButton} onClick={() => setShowModal(false)} />
      <div className={styles.text}>Enter product name:</div>
      <input
        type="text"
        className={styles.input}
        placeholder="Product name"
        value={selectedValues.name}
        onChange={(event) => setSelectedValues({ ...selectedValues, name: event.target.value })}
        spellCheck="false"
      />
      <div className={styles.text}>Enter product price in $:</div>
      <input
        type="number"
        className={styles.input}
        placeholder="Product price"
        value={selectedValues.price}
        onChange={(event) => setSelectedValues({ ...selectedValues, price: event.target.value })}
        spellCheck="false"
      />
      <div className={styles.text}>Select gender:</div>
      <Select
        options={genders}
        className={styles.selectInput}
        defaultValue={selectedValues.gender && { value: selectedValues.gender, label: genders[selectedValues.gender - 1]?.label }}
        onChange={(event) => setSelectedValues({ ...selectedValues, gender: event.value })}
      />
      <div className={styles.text}>Select categories:</div>
      <Select
        options={categories}
        className={styles.selectInput}
        defaultValue={selectedValues.categories && selectedValues.categories.map((item: any) => ({ value: item.id, label: item.name }))}
        onChange={(selectedOptions) => setSelectedValues({ ...selectedValues, categories: selectedOptions.map(option => ({ id: option.value, name: option.label })) })}
        isMulti
      />
      <div className={styles.text}>Select brand:</div>
      <Select
        options={brands}
        className={styles.selectInput}
        defaultValue={selectedValues.brand.id && { value: selectedValues.brand.id, label: selectedValues.brand.name }}
        onChange={(event) => setSelectedValues({ ...selectedValues, brand: { id: event.value, name: event.label } })}
      />
      <div className={styles.text}>Select color:</div>
      <Select
        options={colors}
        className={styles.selectInput}
        defaultValue={selectedValues.color.id && { value: selectedValues.color.id, label: selectedValues.color.name }}
        onChange={(event) => setSelectedValues({ ...selectedValues, color: { id: event.value, name: event.label } })}
      />
      <div className={styles.text}>Select sizes:</div>
      <Select
        options={sizes}
        className={styles.selectInput}
        defaultValue={selectedValues.sizes && selectedValues.sizes.map((item: any) => ({ value: item.id, label: item.name }))}
        onChange={(selectedOptions) => setSelectedValues({ ...selectedValues, sizes: selectedOptions.map(option => ({ id: option.value, name: option.label })) })}
        isMulti
      />
      <div className={styles.text}>Description:</div>
      <textarea
        className={styles.input}
        placeholder="Product description"
        rows={3}
        value={selectedValues.description}
        onChange={(event) => setSelectedValues({ ...selectedValues, description: event.target.value })}
        spellCheck="false"
      />
      {selectedValues.sizes.length > 0 && <div style={{ marginBottom: "20px" }}>
        <div className={styles.text}>Enter amount of products for each size:</div>
        {selectedValues.sizes.map((item: any) => (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "250px", margin: "10px 0" }}>
            <div style={{ fontWeight: "600" }}>{item.name}:</div>
            <input type="number" className={styles.amoutInput} value={item.amount} onChange={(event) => setSelectedValues({ ...selectedValues, sizes: selectedValues.sizes.map((size: any) => size.id === item.id ? { ...size, amount: event.target.value } : size) })} />
          </div>
        ))}
      </div>}
      <div className={styles.text}>Select images:</div>
      <div className={styles.images}>
        {selectedValues.images && selectedValues.images.map((item: any) => (
          <img key={item} src={item} alt="" className={styles.image} />
        ))}
      </div>
      <input type="file" className={styles.fileInput} onChange={handleFileChange} accept="image/jpeg,image/png,image/jpg,image/webp" multiple />
      <div className={styles.buttons}>
        <button className={styles.button} style={{ backgroundColor: "red" }} onClick={() => setShowModal(false)}>Cancel</button>
        <button className={styles.button} style={{ backgroundColor: "green" }} onClick={() => { formSubmit(selectedValues); setShowModal(false)}}>Confirm</button>
      </div>
    </div>
  )
}
