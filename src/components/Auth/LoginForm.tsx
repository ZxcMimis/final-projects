import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './Auth.module.scss';

const loginSchema = z.object({
  email: z.string().min(1, "Це обов'язкове поле").email('Некоректний формат email'),
  password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitch: () => void;
}

export const LoginForm = ({ onSwitch }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
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

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label htmlFor="login-email" className={styles.label}>Електронна пошта:</label>
          <input 
            id="login-email"
            type="text" 
            placeholder="your@email.com" 
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            {...register('email')}
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
          />
          {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        </div>

        <div className={styles.formActions}>
          <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
            УВІЙТИ
          </button>
          <button 
            className={`${styles.btn} ${styles.btnSecondary}`} 
            type="button" 
            onClick={onSwitch}
          >
            РЕЄСТРАЦІЯ
          </button>
        </div>
      </form>
    </div>
  );
};