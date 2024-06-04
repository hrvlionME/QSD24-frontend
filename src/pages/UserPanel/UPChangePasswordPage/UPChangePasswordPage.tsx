import { useState } from "react";
import styles from "./UPChangePasswordPage.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { changePassword } from "../../../services/auth";
import { useTranslation } from "react-i18next";

export default function UPChangePasswordPage() {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isValidOldPassword, setIsValidOldPassword] = useState(true);
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const { t } = useTranslation();

  function validateOldPassword(event: any) {
    const password = event.target.value;
    setOldPassword(password);
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidOldPassword(re.test(password));
  }

  function validateNewPassword(event: any) {
    const password = event.target.value;
    setNewPassword(password);
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidNewPassword(re.test(password));
  }

  async function handleSubmit() {
    const requestBody = {
      current_password: oldPassword,
      new_password: newPassword,
      confirm_password: newPassword,
    };
    await changePassword(requestBody)
  }

  return (
    <div className={styles.content}>
      <div style={{ position: "relative" }}>
        <input type={showPassword ? "text" : "password"} onChange={validateOldPassword} className={`${styles.input} ${isValidOldPassword ? styles.validInput : styles.invalidInput}`} placeholder={t("oldPassword")} spellCheck="false" required />
        {showPassword ?
          <AiFillEyeInvisible onClick={() => setShowPassword(prev => !prev)} className={styles.icon} /> :
          <AiFillEye onClick={() => setShowPassword(prev => !prev)} className={styles.icon} />
        }
      </div>
      {!isValidOldPassword && <p className={styles.errorMessage}>{t("password_contain")}</p>}
      <div style={{ position: "relative" }}>
        <input type={showPasswordConfirm ? "text" : "password"} onChange={validateNewPassword} className={`${styles.input} ${isValidNewPassword ? styles.validInput : styles.invalidInput}`} placeholder={t("newPassword")} spellCheck="false" required />
        {showPasswordConfirm ?
          <AiFillEyeInvisible onClick={() => setShowPasswordConfirm(prev => !prev)} className={styles.icon} /> :
          <AiFillEye onClick={() => setShowPasswordConfirm(prev => !prev)} className={styles.icon} />
        }
      </div>
      {!isValidNewPassword && <p className={styles.errorMessage}>{t("password_contain")}</p>}
      <div className={styles.buttonWrapper}>
        <button
          className={`${styles.button} ${
            isValidOldPassword && isValidNewPassword
              ? styles.validButton
              : styles.invalidButton
          }`}
          value="Login"
          disabled={!isValidOldPassword || !isValidNewPassword}
        >
          {t("change_password")}
        </button>
      </div>
    </div>
  )
}