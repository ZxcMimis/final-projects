import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './RegisterForm.module.scss';

const registerSchema = z.object({
  email: z.string().min(1, "Це обов'язкове поле").email('Некоректний формат email'),
  password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitch: () => void;
}

export const RegisterForm = ({ onSwitch }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div className={styles.authCard}>
      <p className={styles.authHint}>
        Ви можете зареєструватися за допомогою<br /> акаунта Google
      </p>
      
      <div className={styles.googleBtnWrapper}>
        <button className={styles.googleBtn} type="button">
          <span className={styles.googleIconPlaceholder}>G</span>
          Google
        </button>
      </div>

      <p className={styles.authHint}>
        Або створити акаунт за допомогою ел. пошти<br /> та паролю
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label htmlFor="register-email" className={styles.label}>Електронна пошта:</label>
          <input 
            id="register-email"
            type="text" 
            placeholder="your@email.com" 
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            {...register('email')}
          />
          {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        </div>
        
        <div className={styles.inputWrapper}>
          <label htmlFor="register-password" className={styles.label}>Пароль:</label>
          <input 
            id="register-password"
            type="password" 
            placeholder="••••••••" 
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            {...register('password')}
          />
          {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        </div>

        <div className={styles.formActions}>
          <button 
            className={`${styles.btn} ${styles.btnSecondary}`} 
            type="button" 
            onClick={onSwitch}
          >
            УВІЙТИ
          </button>
          <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
            РЕЄСТРАЦІЯ
          </button>
        </div>
      </form>
    </div>
  );
};