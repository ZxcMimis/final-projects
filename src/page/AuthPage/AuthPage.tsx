import { useState } from "react";
import {LoginForm} from "../../components/Auth/LoginForm";
import {RegisterForm} from "../../components/Auth/RegisterForm";
import styles from "./AuthPage.module.scss";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.authPageContainer}>
      <div className={styles.brandSection}>
        <div className={styles.logoGroup}>
          <h1 className={styles.mainTitle}>InvestIQ</h1>
          <p className={styles.subTitle}>SMART FINANCE</p>
        </div>
      </div>

      <div className={styles.formSection}>
        {isLogin ? (
          <LoginForm onSwitch={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitch={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};
