import Footer from '../../components/Footer/Footer'
import styles from './CartPage.module.css'
import emptyImg from '../../assets/images/empty-cart.webp'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GoTrash } from "react-icons/go";
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { clearCart, removeProductFromCart, updateProductAmount, updateProductSize } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';


export default function CartPage() {

    const initialProductsState = useSelector((state: RootState) => state.cart.products);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [products, setProducts] = useState(initialProductsState);
    const [subTotal, setSubtotal] = useState(0);


    useEffect(() => {
        setProducts(initialProductsState);

        let total: number = 0;
        initialProductsState.forEach(product => {
            total += product.totalPrice;
        });
        setSubtotal(total);
    }, [initialProductsState]);

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    const handleContinue = () => {
        navigate("/shop/all/1");
    }

    const handleCheckout = () => {
        navigate("/payment");
    }

    const handleDecreaseAmount = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        const productId = Number(event.currentTarget.dataset.productId);
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId && product.amount > 1
                    ? { ...product, amount: product.amount - 1 }
                    : product
            )
        );
        dispatch(updateProductAmount({ productId, newAmount: (products.find(product => product.id === productId)?.amount || 0) - 1 }));

    }
    
    const handleIncreaseAmount = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        const productId = Number(event.currentTarget.dataset.productId);
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? { ...product, amount: product.amount + 1 }
                    : product
            )
        );
        dispatch(updateProductAmount({ productId, newAmount: (products.find(product => product.id === productId)?.amount || 0) + 1 }));
    }
    
    const handleDelete = (productId: number) => {
        dispatch(removeProductFromCart(productId));
    }

    const handleSizeChange = (productId: number, newSize: string) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? { ...product, selectedSize: newSize }
                    : product
            )
        );
        dispatch(updateProductSize({ productId, newSize }));
    };

    console.log(products)

  return (
    <>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.title}>
                    <span>Cart</span>
                </div>
                {products.length === 0 ?
                <div className={styles.noItems}>
                    <span>Empty cart</span>
                    <img className={styles.imageCart} src={emptyImg} alt="" />
                    <button style={{cursor: "pointer"}} onClick={handleContinue}>Shop now</button>
                </div> :
                products.map((product) => (
                    <div className={styles.item}>
                        <div className={styles.imgContainer}>
                          <img src={`http://127.0.0.1:8000/storage/products/${product.images[0].name}`} alt="" />
                        </div>
                        <div className={styles.detailsContainer}>
                            <span>{product.name}</span>
                            <span className={styles.itemPrice}>${product.price}</span>
                            <div className={styles.amountContainer}>
                                <FiMinus style={{cursor: "pointer"}} onClick={handleDecreaseAmount} data-product-id={product.id}/>
                                <span>{product.amount}</span>
                                <FiPlus style={{cursor: "pointer"}} onClick={handleIncreaseAmount} data-product-id={product.id}/>
                            </div>
                            <div className={styles.selectContainer}>
                            <select value={product.selectedSize} onChange={(e) => handleSizeChange(product.id, e.target.value)}>
                                {product.sizes.map((size) => (
                                    <option key={size.name} value={size.name}>{size.name}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className={styles.priceContainer}>
                            <span>
                            ${product.totalPrice}
                            </span>
                            <div className={styles.deleteContainer} onClick={() => handleDelete(product.id)}><GoTrash className={styles.trash}/>Delete</div>
                        </div>
                    </div>
                )
                )}
            </div>
            <div className={styles.right}>
                <span>Delivery</span>
                <div>
                    <div className={styles.delivery}>
                        <div className={styles.selectedDelivery}>Free</div>
                    </div>
                    <div className={styles.deliveryDate}>
                        <span>Delivery date : {new Date().toLocaleDateString()}</span>
                    </div> 
                </div>           
                <div className={styles.subTotal}>
                    <div>
                        <span>Subtotal</span>
                        <span>${subTotal.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Delivery</span>
                        <span>$0.00</span>
                    </div>
                </div>
                <div className={styles.total}>
                        <span>Total</span>
                        <span>${subTotal.toFixed(2)}</span>
                </div>
                <div>
                    <button className={styles.checkout} onClick={handleCheckout}>Proceed to Checkout</button>
                    <button className={styles.continue} onClick={handleContinue}>Continue Shopping</button>
                    <button className={styles.clear} onClick={handleClearCart}>Clear Cart</button>
                </div>
            </div>
        </div>
        <Footer />
    </>
  );
}
