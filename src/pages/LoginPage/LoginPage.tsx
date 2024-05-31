import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "./LoginPage.module.css";
import image from "../../assets/images/login-removebg-preview.png";
import bgImg from "../../assets/images/auth_bg.jpg";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../redux/userSlice";
import { login } from "../../services/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function validateEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    const re = /\S+@\S+\.\S+/;
    setIsValidEmail(re.test(event.target.value));
  }

  function validatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidPassword(re.test(event.target.value));
  }

  async function formSubmit() {
    const requestBody = {
      email: email,
      password: password,
    };

    try { 
      await login(requestBody)
      dispatch(loginAction({
        id: 0,
        first_name: "",
        last_name: "",
        email: requestBody.email,
        password: requestBody.password,
        token: "",
      }));
      navigate("/sendCode")
    }
    catch (err: any) { setError(err) }
  }

  return (
    <div className={styles.bgImg} style={{ backgroundImage: `url(${bgImg})` }}>
      <div className={styles.box}>
        <img src={image} alt="login" style={{ width: "100%" }} />
        <input
          type="text"
          className={`${styles.input} ${
            isValidEmail ? styles.validInput : styles.invalidInput
          }`}
          onChange={validateEmail}
          placeholder="Email address"
          autoComplete="off"
          spellCheck="false"
          required
        />
        {!isValidEmail && (
          <p className={styles.errorMessage}>
            Required field, invalid email format.
          </p>
        )}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            className={`${styles.input} ${
              isValidPassword ? styles.validInput : styles.invalidInput
            }`}
            onChange={validatePassword}
            placeholder="Password"
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
          <p className={styles.errorMessage}>
            Password must have at least 8 characters, one capital letter, one
            small letter, one number, and one special character.
          </p>
        )}
        <button
          onClick={formSubmit}
          className={`${styles.button} ${
            isValidEmail && isValidPassword
              ? styles.validButton
              : styles.invalidButton
          }`}
          disabled={!isValidEmail || !isValidPassword}
        >
          Login
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.links}>
          <Link to="/signup" className={styles.link}>
            Go to Sign Up
          </Link>
          <Link to="/forgot-password" className={styles.link}>
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
