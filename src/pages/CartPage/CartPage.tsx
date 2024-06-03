import Footer from '../../components/Footer/Footer'
import styles from './CartPage.module.css'
import emptyImg from '../../assets/images/empty-cart.webp'

export default function CartPage() {
  return (
    <>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.title}>
                    <span>Cart</span>
                </div>
                <div className={styles.noItems}>
                    <span>Empty cart</span>
                    <img className={styles.imageCart} src={emptyImg} alt="" />
                    <button>Shop now</button>
                </div>
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
                        <span>$0.00</span>
                    </div>
                    <div>
                        <span>Delivery</span>
                        <span>$0.00</span>
                    </div>
                </div>
                <div className={styles.total}>
                        <span>Total</span>
                        <span>$0.00</span>
                </div>
                <div>
                    <button className={styles.checkout}>Proceed to Checkout</button>
                    <button className={styles.continue}>Continue Shopping</button>
                    <button className={styles.clear}>Clear Cart</button>
                </div>
            </div>
        </div>
        <Footer />
    </>
  );
}
