import { useSelector } from 'react-redux';
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
  import { StripeAddressElementOptions, PaymentIntentResult } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

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
    const [isCardNumberComplete, setIsCardNumberComplete] = useState<boolean>(false);
    const [isExpiryComplete, setIsExpiryComplete] = useState<boolean>(false);
    const [isCvcComplete, setIsCvcComplete] = useState<boolean>(false);
    
    
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
        event.preventDefault();
        if (!stripe || !elements) {
          return;
        }
    
        const { error, paymentIntent }: PaymentIntentResult = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: 'your-return-url',
          },
        });
    
        if (error) {
          console.error(error);
          return;
        }
    
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded!');
        }
      };
    
      const nextStep = () => setStep((prevStep) => prevStep + 1);
      const prevStep = () => setStep((prevStep) => prevStep - 1);

      const handleRedirect = () => {
        navigate('/cart')
      }

      const handleAddressChange = (event: any) => {
        const address = event.value.address;
        setAddress(address);
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
                                {products.map((product) => (
                                <div className={styles.item}>
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
                                    <button className={styles.formNext} type="submit" onClick={nextStep} disabled={!isCardNumberComplete || !isExpiryComplete || !isCvcComplete}>
                                        Pay
                                    </button>
                                    </div>
                                )}
                                </form>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}