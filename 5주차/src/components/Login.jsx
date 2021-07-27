import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = ({ onLogin }) => {
  const id = useRef();
  const password = useRef();
  const handleLogin = () => {
    onLogin({
      username: id.current.value,
      password: password.current.value,
    });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.field}>
          <p>ID</p>
          <input className={styles.input} ref={id} type="text" />
        </div>
        <div className={styles.field}>
          <p>PASSWORD</p>
          <input className={styles.input} ref={password} type="password" />
        </div>
        <Link to="/register" className={styles.signupButton}>
          회원가입
        </Link>
        <button className={styles.button} onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
