import React, { useState } from "react";
import styles from "./ForgotPasswordPage.module.css";
import bg from "../../assets/images/auth_bg.jpg";
import image from "../../assets/images/forgotPassword.png";
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { requestValidationKey } from "../../services/auth";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../redux/userSlice";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    if (!isValidEmail(email)) {
      setError(t("invalid_email_format"));
    } else {
      setError("");
    }

    const requestBody = {
      email: email,
    };
    try {
      await requestValidationKey(requestBody);

      dispatch(
        loginAction({
          id: "",
          username: "",
          email: requestBody.email,
          password: "",
          token: "",
        })
      );

      navigate("/sendCode", { state: { isFromForgotPassword: true } });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "object" && err !== null && "response" in err) {
        setError((err as any).response.data.message);
      } else {
        setError(t("user_does_not_exist"));
      }
    }
  }

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className={styles.background}
    >
      <div className={styles.root}>
        <Link to="/login" className={styles.backArrow}>
          <FiArrowLeftCircle />
        </Link>
        <img src={image} alt="" className={styles.img} />
        <input
          type="text"
          className={`${styles.emailInput} ${error ? styles.errorInput : ""}`}
          placeholder={t("email_address")}
          value={email}
          onChange={handleEmailChange}
        />
        {error && <p className={styles.errorText}>{error}</p>}
        <button
          className={styles.btn}
          disabled={!isValidEmail(email)}
          onClick={handleSubmit}
        >
          {t("send_email")}
        </button>
      </div>
    </div>
  );
}
