import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './PaymentPage.module.css'
import { useEffect, useState } from 'react';
import {
    useStripe,
    useElements,
    AddressElement,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
  } from '@stripe/react-stripe-js';
  import { StripeAddressElementOptions, PaymentIntentResult, StripeCardNumberElement } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { pay } from '../../services/products';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCart } from '../../redux/cartSlice';

export default function PaymentPage(){

    const navigate = useNavigate()
    const initialProductsState = useSelector((state: RootState) => state.cart.products);
    const [products, setProducts] = useState(initialProductsState);
    const [subTotal, setSubtotal] = useState(0);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState<string>('');
    const [step, setStep] = useState<number>(0);
    const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
    const [address, setAddress] = useState<any>({});
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [isCardNumberComplete, setIsCardNumberComplete] = useState<boolean>(false);
    const [isExpiryComplete, setIsExpiryComplete] = useState<boolean>(false);
    const [isCvcComplete, setIsCvcComplete] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [guestEmail, setGuestEmail] = useState<string>('');
    const [showGuestModal, setShowGuestModal] = useState<boolean>(!user.loggedIn);
    const [isValidEmail, setIsValidEmail] = useState(true);
    
    console.log(showGuestModal)
    const addressElementOptions : StripeAddressElementOptions = {
        mode: 'billing',
        fields: {
            phone: 'always',
        },
    };


    useEffect(() => {
        setProducts(initialProductsState);

        let total: number = 0;
        initialProductsState.forEach(product => {
            total += product.totalPrice;
        });
        setSubtotal(total);
    }, [initialProductsState]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault();

        if (!stripe || !elements) {

            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement) as StripeCardNumberElement,
          });
          console.log(paymentMethod);
    
          if (!error) {
            try {
              const payload = {
                payment_method: paymentMethod.id,
                full_name: name,
                address: address.line1,
                city: address.city,
                zip: address.postal_code,
                phone: phone
                  ? '00' + phone.substring(1)
                  : '00000000000',
                total_price: subTotal,
                email: user.loggedIn ? user.email : guestEmail,
                token: "tok_visa"
                };

              console.log(payload)
              try {
                await pay(payload);
                toast.success("Thank you for your purchase!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  dispatch(clearCart());
                  navigate('/');

              } catch (error) {
                toast.error("There has been a problem with your payment", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false)
              }
            }catch(error) {
                toast.error("There has been a problem with your payment", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false)
            } 
      };
    }

      const nextStep = () => setStep((prevStep) => prevStep + 1);
      const prevStep = () => setStep((prevStep) => prevStep - 1);

      const handleRedirect = () => {
        navigate('/cart')
      }

      const handleAddressChange = (event: any) => {
        setAddress(event.value.address);
        setName(event.value.name);
        setPhone(event.value.phone);
        setIsFormComplete(
            event.value.name &&
            event.value.phone &&
            address.line1 &&
            address.city &&
            address.postal_code &&
            address.country
        );
    };

    const handleCardNumberChange = (event: any) => {
        setIsCardNumberComplete(event.complete);
    };

    const handleExpiryChange = (event: any) => {
        setIsExpiryComplete(event.complete);
    };

    const handleCvcChange = (event: any) => {
        setIsCvcComplete(event.complete);
    };


    const handleGuestEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (guestEmail) {
            setShowGuestModal(false);
        } else {
            toast.error("Please enter a valid email address", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    function validateEmail(event: any) {
        setGuestEmail(event.target.value);
        const re = /\S+@\S+\.\S+/;
        setIsValidEmail(re.test(event.target.value));
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.cartContainer}>
                            <div className={styles.total}>
                                <h3>Cart</h3>
                                <h3>
                                    <span>Total (with tax): ${subTotal.toFixed(2)}</span>
                                </h3>
                            </div>
                                {products.map((product, index) => (
                                <div className={styles.item} key={index}>
                                    <div className={styles.imgContainer}>
                                    <img src={`http://127.0.0.1:8000/storage/products/${product.images[0].name}`} alt="product" />
                                    </div>
                                    <div className={styles.detailsContainer}>
                                        <span>{product.name}</span>
                                        <span className={styles.itemPrice}>${product.price.toFixed(2)}</span>
                                        <div className={styles.amountContainer}>
                                            <span>{product.amount}</span>
                                        </div>
                                        <div className={styles.selectContainer}>
                                        <select value={product.selectedSize} disabled>
                                            {product.sizes.map((size) => (
                                                <option key={size.name} value={size.name}>{size.name}</option>
                                            ))}
                                        </select>
                                        </div>
                                    </div>
                                    <div className={styles.priceContainer}>
                                        <span>
                                        ${product.totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.demoWrapper}>
                        <div className={styles.demo}>
                            <form onSubmit={handleSubmit}>
                                {step === 0 && (
                                    <div>
                                        <div>
                                        Address
                                        <AddressElement options={addressElementOptions} className={styles.address} onChange={handleAddressChange}/>
                                    </div>
                                    <button className={styles.formBack} type="button" onClick={handleRedirect}>
                                        Go Back
                                    </button>
                                    <button className={styles.formNext} type="button" onClick={nextStep} disabled={!isFormComplete}>
                                        Next
                                    </button>
                                    </div>
                                )}
                                {step === 1 && (
                                    <div>
                                    <label>
                                        Card Number
                                        <CardNumberElement className={styles.cardNumber} onChange={handleCardNumberChange}/>
                                    </label>
                                    <label>
                                        Expiration Date
                                        <CardExpiryElement className={styles.cardExpiry} onChange={handleExpiryChange}/>
                                    </label>
                                    <label>
                                        CVC
                                        <CardCvcElement className={styles.cardCvc} onChange={handleCvcChange}/>
                                    </label>
                                    <button className={styles.formBack} type="button" onClick={prevStep}>
                                        Go Back
                                    </button>
                                    <button className={styles.formNext} type="submit" disabled={!isCardNumberComplete || !isExpiryComplete || !isCvcComplete || loading}>
                                        {loading ? "Processing..." : "Pay"}
                                    </button>
                                    </div>
                                )}
                                </form>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
            {showGuestModal && (
                <div className={styles.guestModal}>
                    <div className={styles.guestModalContent}>
                        <form onSubmit={handleGuestEmailSubmit}>
                            <label>Enter email</label>
                            <input type="email" value={guestEmail} onChange={validateEmail} placeholder='Email address' required className={!isValidEmail ? `${styles.invalidEmail}` : `${styles.guestEmail}`}/>
                                {!isValidEmail && (
                                    <p className={styles.errorMessage}>
                                        Required field, invalid email format.
                                    </p>
                                )}
                            <button type="submit" disabled={!isValidEmail}>Confirm Email</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}