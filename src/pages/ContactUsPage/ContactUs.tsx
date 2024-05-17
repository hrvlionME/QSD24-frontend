import Footer from '../../components/Footer/Footer';
import styles from './ContactUs.module.css';


export default function ContactUs() {




  return (
    <>
      <div className={styles.container}>
          <div className={styles.background}>
            <h1>How can we help?</h1>
          </div>
          <div className={styles.formBox}>
            <h3>Contact Us Directly</h3>
            <label>Full name</label>
            <input type="text"/>
            <label>Email address</label>
            <input type="text"/>
            <label>Subject</label>
            <input type="text"/>
            <label>Message</label>
            <textarea/>
            <div className={styles.btnBox}>
            <button className={styles.btn}>
              Send Message
            </button>
          </div>
          </div>
      </div>
      <Footer/>
    </>
  );
}