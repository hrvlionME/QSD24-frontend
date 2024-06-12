import React, { useEffect, useRef, useState } from 'react';
import styles from './TwoFA.module.css';
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword, sendCode } from '../../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { login } from '../../redux/userSlice';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import { BallTriangle } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function TwoFA() {

  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const { isFromForgotPassword } = location.state || {};
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    toast.success("2FA code sent to your email.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }, []);

  function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = event.target;
    if (value.length <= 1 && !isNaN(Number(value))) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value !== "" && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Backspace" && index > 0 && !code[index]) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleSubmit(event: any) {
    setLoading(true);
    const codeAsString = code.join("");
    const validationKey = parseInt(codeAsString, 10);

    if (isFromForgotPassword) {
      const requestBody = {
        email: user.email,
        password: password,
        key: validationKey,
      };

      try {
        await resetPassword(requestBody);

        navigate('/login');
      }
      catch (error: any) { setError(error.response ? error.response.data.message : "Reset password failed"); }
    }
    else {
      const requestBody = {
        email: user.email,
        password: user.password,
        validation_key: validationKey,
      };

      try {
        const response = await sendCode(requestBody);

        dispatch(login({
          id: response.user.id,
          first_name: response.user.first_name,
          last_name: response.user.last_name,
          email: requestBody.email,
          password: requestBody.password,
          token: response.access_token,
          role: response.user.role
        }));

        navigate('/');
      }
      catch (error: any) {
        setLoading(false);
        toast.error("Validation key is not valid.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setError(error.response ? error.response.data.message : "Login failed");
      }
    }
  }

  useEffect(() => {
    const allFieldsFilled = code.every(digit => digit !== "");
    setIsButtonDisabled(!allFieldsFilled);
  }, [code]);

  return (
    <>
      <div className={styles.root}>
        <Link to="/login" className={styles.backArrow}><FiArrowLeftCircle /></Link>
        <div className={styles.circle}>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" color="var(--light-blue)" height="48" width="48" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--light-blue)' }}>
            <path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 1 0-56 0z"></path>
          </svg>
        </div>
        <p className={styles.title}>Two Factor Authentication</p>
        <div className={styles.numInputContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              className={styles.numInput}
              key={index}
              ref={(el) => inputRefs.current[index] = el}
              maxLength={1}
              value={code[index] || ""}
              onChange={(e) => handleCodeChange(e, index)}
              onKeyDown={(e) => handleKeyPress(e, index)}
              required
            />
          ))}
        </div>
        <p className={styles.message}>Enter 6-digit code that has been sent to your mail.</p>
        {isFromForgotPassword ? <ResetPassword password={password} passwordConfirm={passwordConfirm} setPassword={setPassword} setPasswordConfirm={setPasswordConfirm} /> : <div></div>}
        <button className={styles.btn} onClick={handleSubmit} disabled={isButtonDisabled}>Confirm</button>
      </div>
      {loading &&
        <div className={styles.loader}>
          <BallTriangle
            height={80}
            width={80}
            radius={5}
            color="#2573E7"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      }
    </>
  );
}
