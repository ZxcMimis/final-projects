import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/useAuth'; 
import styles from './Login.module.scss';

const loginSchema = z.object({
  email: z.string().min(1, "Це обов'язкове поле").email('Некоректний формат email'),
  password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitch: () => void;
}

export const LoginForm = ({ onSwitch }: LoginFormProps) => {
  const { login } = useAuth();
  
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLocalError(null);
    
    const result = await login(data.email, data.password);
    
    if (!result.success) {
      setLocalError(result.error || 'Сталася помилка під час входу');
    } else {
      console.log('Вхід успішний!');
    }
  };

  return (
    <div className={styles.authCard}>
      <p className={styles.authHint}>
        Ви можете авторизуватися за допомогою<br /> акаунта Google
      </p>
      
      <div className={styles.googleBtnWrapper}>
        <button className={styles.googleBtn} type="button">
          <span className={styles.googleIconPlaceholder}>G</span>
          Google
        </button>
      </div>

      <p className={styles.authHint}>
        Або увійти за допомогою ел. пошти та<br /> паролю після реєстрації
      </p>

      {localError && (
        <div className={styles.errorText} style={{ textAlign: 'center', marginBottom: '10px' }}>
          {localError}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label htmlFor="login-email" className={styles.label}>Електронна пошта:</label>
          <input 
            id="login-email"
            type="text" 
            placeholder="your@email.com" 
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            {...register('email')}
            disabled={isSubmitting} 
          />
          {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        </div>
        
        <div className={styles.inputWrapper}>
          <label htmlFor="login-password" className={styles.label}>Пароль:</label>
          <input 
            id="login-password"
            type="password" 
            placeholder="••••••••" 
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            {...register('password')}
            disabled={isSubmitting}
          />
          {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        </div>

        <div className={styles.formActions}>
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`} 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'ЗАВАНТАЖЕННЯ...' : 'УВІЙТИ'}
          </button>
          <button 
            className={`${styles.btn} ${styles.btnSecondary}`} 
            type="button" 
            onClick={onSwitch}
            disabled={isSubmitting}
          >
            РЕЄСТРАЦІЯ
          </button>
        </div>
      </form>
    </div>
  );
};