import React, { useState } from 'react';
import styles from './Faq.module.css';
import { Link } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import { FiMinus} from "react-icons/fi"
import Footer from '../../components/Footer/Footer';

export default function Faq() {
  const [questions, setQuestions] = useState([
    "What types of payment do you accept?",
    "Do you offer gift wrapping?", 
    "How do I know which size to order?", 
    "What is your exchange policy?", 
    "Are your products ethically sourced?"
  ]);

  const [title, setTitle] = useState("Shopping");
  const [answers, setAnswers] = useState([
    "We accept all major credit cards.", 
    "No, we don't offer gift wrapping.", 
    "We recommend referring to our sizing chart and measuring yourself before placing an order. If you are unsure about which size to order, you can also contact our customer service team for assistance.", 
    "If you need to exchange an item, please contact our customer service within 30 days of delivery. We will send you a prepaid shipping label and exchange the item for the same product in a different size or color.", 
    "Yes, we are committed to sourcing our products ethically and work with suppliers who share our values." 
  ]);
  const [expanded, setExpanded] = useState(Array(questions.length).fill(false));

  const handleToggle = (index: number) => {
    setExpanded(prev => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const handleHeadingClick = (heading: string) => {
    setTitle(heading);
    if(heading === "Shopping"){
      setQuestions([
        "What types of payment do you accept?",
        "Do you offer gift wrapping?", 
        "How do I know which size to order?", 
        "What is your exchange policy?", 
        "Are your products ethically sourced?"
      ]);
      setAnswers([
        "We accept all major credit cards.", 
        "No, we don't offer gift wrapping.", 
        "We recommend referring to our sizing chart and measuring yourself before placing an order. If you are unsure about which size to order, you can also contact our customer service team for assistance.", 
        "If you need to exchange an item, please contact our customer service within 30 days of delivery. We will send you a prepaid shipping label and exchange the item for the same product in a different size or color.", 
        "Yes, we are committed to sourcing our products ethically and work with suppliers who share our values." 
      ]);
    } else if (heading === "Receiving shipment") {
      setQuestions([
        "How long does it take to receive my order?",
        "Do you offer free shipping?",
        "Can I pick up my order at a physical location?"
      ]);
      setAnswers([
        "Our standard shipping time is 5-7 business days.",
        "We offer free standard shipping for all orders",
        "Unfortunately, we do not offer in-store pickup at this time. All orders are shipped directly to the address provided during checkout."
      ]);
    } else if (heading === "Return of Goods"){
      setQuestions([
        "What is your return policy?",
        "What if I receive a damaged or defective item?"
      ]);
      setAnswers([
       "Our return policy allows you to return any item within 30 days of delivery for a full refund or exchange. Please contact us with mail to initiate the return process.",
       "If you receive a damaged or defective item, please contact our customer service team within 30 days of delivery. We will provide a prepaid shipping label and either replace the item or issue a refund."
      ]);
    } else if (heading === "Complaint"){
      setQuestions([
        "Can I contact customer service if I have a question about my order?",
        "What is your privacy policy?"
      ]);
      setAnswers([
       "Yes, you can contact our customer service team via email or phone.",
       "We take your privacy seriously and do not share your personal information with third parties. Please refer to our privacy policy for more information."
      ]);
    }
  };

  return (
    <>
    <div className={styles.container}>
       <div className={styles.heading}>
            <div className={title === "Shopping" ? styles.headingItemSelected : styles.headingItem} onClick={() => handleHeadingClick("Shopping")}>
            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="25"  width="25">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <h4>SHOPPING</h4>
            </div>
            <div className={title === "Receiving shipment" ? styles.headingItemSelected : styles.headingItem} onClick={() => handleHeadingClick("Receiving shipment")}>
            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                <path d="M18 18.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m1.5-9l1.96 2.5H17V9.5m-11 9A1.5 1.5 0 014.5 17 1.5 1.5 0 016 15.5 1.5 1.5 0 017.5 17 1.5 1.5 0 016 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 003 3 3 3 0 003-3h6a3 3 0 003 3 3 3 0 003-3h2v-5l-3-4z" />
            </svg>
            <h4>RECEIVING SHIPMENT</h4>
            </div>
       
            <div className={title === "Return of Goods" ? styles.headingItemSelected : styles.headingItem} onClick={() => handleHeadingClick("Return of Goods")}>
            <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M112 352l-64-64 64-64"/>
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M64 288h294c58.76 0 106-49.33 106-108v-20"/>
            </svg>
            <h4>RETURN OF GOODS</h4>
            </div>
            <div className={title === "Complaint" ? styles.headingItemSelected : styles.headingItem} onClick={() => handleHeadingClick("Complaint")}>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" height="1em" width="1em">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M8.56 3.69a9 9 0 00-2.92 1.95M3.69 8.56A9 9 0 003 12M3.69 15.44a9 9 0 001.95 2.92M8.56 20.31A9 9 0 0012 21M15.44 20.31a9 9 0 002.92-1.95M20.31 15.44A9 9 0 0021 12M20.31 8.56a9 9 0 00-1.95-2.92M15.44 3.69A9 9 0 0012 3" />
            </svg>
            <h4>COMPLAINT</h4>
            </div>
       </div>
       <div className={styles.items}>
        <h4 className={styles.title}>{title}</h4>
        {questions.map((question, index) => {
          const isExpanded = expanded[index];
          return <div key={index} className={styles.item}  onClick={() => handleToggle(index)}>
           <span className={isExpanded ? styles.questionExpanded : styles.question}>
                {isExpanded ? <FiMinus /> : <FiPlus />} {question}
              </span>
              {isExpanded && <span className={styles.answer}>{answers[index]}</span>}
          </div>
        })}
       </div>
       <div className={styles.footer}>
            <span>Are you mising some information?</span>
            <span>
            No problem, do not hesitate to contact our customer service via the e-mail address: hello@qsd.ba, where we will be happy to answer your questions and solve all requests.
            <Link to='/contact-us' className={styles.link}> Or contact us directly here.</Link>
            </span>
       </div>
       
    </div>
    <Footer/>
  </>
  );
}
