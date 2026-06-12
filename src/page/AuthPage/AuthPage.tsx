import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { LoginForm } from "../../components/Auth/LoginForm";
import { RegisterForm } from "../../components/Auth/RegisterForm";
import styles from "./AuthPage.module.scss";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

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