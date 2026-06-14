import { useState } from 'react';
import { LoginForm } from '../../components/Auth/LoginForm';
import { RegisterForm } from '../../components/Auth/RegisterForm';
import styles from './AuthPage.module.scss';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.authPage}>
      {/* Див для фонового паттерна */}
      <div className={styles.backgroundPattern}></div>
      
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoPill}></div>
          <span className={styles.logoText}>INVESTIQ</span>
        </div>
      </header>

      <main className={styles.content}>
        
        {/* ЛЕВЫЙ БОКС (Текст + Картинка из SCSS) */}
        <div className={styles.leftBox}>
          <h1 className={styles.title}>
            InvestIQ
            <span className={styles.subtitle}>SMART FINANCE</span>
          </h1>
          {/* Пустой див, куда ляжет картинка через SCSS */}
          <div className={styles.illustrationBox}></div>
        </div>

        {/* ПРАВЫЙ БОКС (Форма) */}
        <div className={styles.rightBox}>
          {isLogin ? (
            <LoginForm onSwitch={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitch={() => setIsLogin(true)} />
          )}
        </div>

      </main>
    </div>
  );
};