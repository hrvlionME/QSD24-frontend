import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from '../../components/Footer/Footer';
import styles from './ContactUs.module.css';
import { contactUs } from "../../services/contact";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ContactUs() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function formSubmit() {
    const requestBody = {
      name: name,
      email: email,
      subject: subject,
      message: message
    };
      const re = /\S+@\S+\.\S+/;
      if(re.test(email)) 
        try {
        await contactUs(requestBody)
        toast.success("Thank you for contacting us. We will answer you as soon as possible.", {
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
        catch (err){
          toast.error("There has been a problem sending your message", {
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
      else 
        toast.error("Invalid email format.", {
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


  return (
    <>
      <div className={styles.container}>
          <div className={styles.background}>
            <h1>{t('how_can_we_help')}</h1>
          </div>
          <div className={styles.formBox}>
            <h3>{t('contact_us_directly')}</h3>
            <label>{t("full_name")}</label>
            <input type="text" onChange={(event) => setName(event.target.value)}/>
            <label>{t("email_address")}</label>
            <input type="email" onChange={(event) => setEmail(event.target.value)}/>
            <label>{t("subject")}</label>
            <input type="text" onChange={(event) => setSubject(event.target.value)}/>
            <label>{t("message")}</label>
            <textarea onChange={(event) => setMessage(event.target.value)}/>
            <div className={styles.btnBox}>
            <button className={styles.btn} onClick={formSubmit}>
            {t("send_message")}
            </button>
          </div>
          </div>
      </div>
      <Footer/>
      <ToastContainer />
    </>
  );
}