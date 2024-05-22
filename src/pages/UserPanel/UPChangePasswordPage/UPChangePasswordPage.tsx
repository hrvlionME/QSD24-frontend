import { useState } from "react";
import Footer from "../../../components/Footer/Footer";
import styles from "./UPChangePasswordPage.module.css";
import UPTitle from '../UPTitle/UPTitle';
import UPNav from '../UPNav/UPNav';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function UPChangePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isValidOldPassword, setIsValidOldPassword] = useState(true);
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  
  function validateOldPassword(event: any) {
    const password = event.target.value;
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidOldPassword(re.test(password));
  }

  function validateNewPassword(event: any) {
    const password = event.target.value;
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidNewPassword(re.test(password));
  }

  return (
    <div style={{ backgroundColor: "var(--primary-color-2)" }}>
      <UPTitle />
      <div className={styles.page}>
        <UPNav active="3" />
        <div className={styles.content}>
          <div style={{ position: "relative" }}>
            <input type={showPassword ? "text" : "password"} onChange={validateOldPassword} className={`${styles.input} ${isValidOldPassword ? styles.validInput : styles.invalidInput}`} placeholder="Old password" autoComplete="off" spellCheck="false" required />
            {showPassword ?
              <AiFillEyeInvisible onClick={() => setShowPassword(prev => !prev)} className={styles.icon} /> :
              <AiFillEye onClick={() => setShowPassword(prev => !prev)} className={styles.icon} />
            }
          </div>
          {!isValidOldPassword && <p className={styles.errorMessage}>Password must have at least 8 characters, one capital letter, one small letter, one number, and one special character.</p>}
          <div style={{ position: "relative" }}>
            <input type={showPasswordConfirm ? "text" : "password"} onChange={validateNewPassword} className={`${styles.input} ${isValidNewPassword ? styles.validInput : styles.invalidInput}`} placeholder="New password" autoComplete="off" spellCheck="false" required />
            {showPasswordConfirm ?
              <AiFillEyeInvisible onClick={() => setShowPasswordConfirm(prev => !prev)} className={styles.icon} /> :
              <AiFillEye onClick={() => setShowPasswordConfirm(prev => !prev)} className={styles.icon} />
            }
          </div>
          {!isValidNewPassword && <p className={styles.errorMessage}>Password must have at least 8 characters, one capital letter, one small letter, one number, and one special character.</p>}
          <div className={styles.buttonWrapper}>
            <button className={`${styles.button} ${isValidOldPassword && isValidNewPassword ? styles.validButton : styles.invalidButton}`} value="Login" disabled={!isValidOldPassword || !isValidNewPassword}>Change Password</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}