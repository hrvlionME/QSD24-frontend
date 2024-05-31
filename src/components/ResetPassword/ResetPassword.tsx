import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTranslation } from "react-i18next";

interface ResetPasswordProps {
  password: string;
  passwordConfirm: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPasswordConfirm: React.Dispatch<React.SetStateAction<string>>;
}

export default function ResetPassword({
  password,
  passwordConfirm,
  setPassword,
  setPasswordConfirm,
}: ResetPasswordProps) {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

  function validatePassword(event: any) {
    setPassword(event.target.value);
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidPassword(re.test(event.target.value));
  }

  function validatePasswordConfirm(event: any) {
    setPasswordConfirm(event.target.value);
    setIsValidPasswordConfirm(password === event.target.value);
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          className={`${styles.input} ${
            isValidPassword ? styles.validInput : styles.invalidInput
          }`}
          onChange={validatePassword}
          placeholder={t("passwordPlaceholder")}
          autoComplete="off"
          spellCheck="false"
          required
        />
        {showPassword ? (
          <AiFillEyeInvisible
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.icon}
          />
        ) : (
          <AiFillEye
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.icon}
          />
        )}
      </div>
      {!isValidPassword && (
        <p className={styles.errorMessage}>{t("passwordError")}</p>
      )}
      <div style={{ position: "relative" }}>
        <input
          type={showPasswordConfirm ? "text" : "password"}
          className={`${styles.input} ${
            isValidPasswordConfirm ? styles.validInput : styles.invalidInput
          }`}
          onChange={validatePasswordConfirm}
          placeholder={t("confirmPasswordPlaceholder")}
          autoComplete="off"
          spellCheck="false"
          required
        />
        {showPasswordConfirm ? (
          <AiFillEyeInvisible
            onClick={() => setShowPasswordConfirm((prev) => !prev)}
            className={styles.icon}
          />
        ) : (
          <AiFillEye
            onClick={() => setShowPasswordConfirm((prev) => !prev)}
            className={styles.icon}
          />
        )}
      </div>
      {!isValidPasswordConfirm && (
        <p className={styles.errorMessage}>{t("confirmPasswordError")}</p>
      )}
    </>
  );
}
