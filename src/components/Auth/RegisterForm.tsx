import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/useAuth';
import styles from './RegisterForm.module.scss';

const registerSchema = z.object({
  username: z.string().min(2, "Ім'я має містити мінімум 2 символи"),
  email: z.string().min(1, "Це обов'язкове поле").email('Некоректний формат email'),
  password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitch: () => void;
}

export const RegisterForm = ({ onSwitch }: RegisterFormProps) => {
  const { register: registerUser } = useAuth(); 
  
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLocalError(null);

    const result = await registerUser(data.email, data.password, data.username);
    
    if (!result.success) {
      setLocalError(result.error || 'Сталася помилка під час реєстрації');
    } else {
      console.log('Реєстрація успішна!');
    }
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

      {localError && (
        <div className={styles.errorText} style={{ textAlign: 'center', marginBottom: '10px' }}>
          {localError}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label htmlFor="register-username" className={styles.label}>Ваше ім'я:</label>
          <input 
            id="register-username"
            type="text" 
            placeholder="Олександр" 
            className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
            {...register('username')}
            disabled={isSubmitting}
          />
          {errors.username && <span className={styles.errorText}>{errors.username.message}</span>}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="register-email" className={styles.label}>Електронна пошта:</label>
          <input 
            id="register-email"
            type="text" 
            placeholder="your@email.com" 
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            {...register('email')}
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        </div>

        <div className={styles.formActions}>
          <button 
            className={`${styles.btn} ${styles.btnSecondary}`} 
            type="button" 
            onClick={onSwitch}
            disabled={isSubmitting}
          >
            УВІЙТИ
          </button>
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`} 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'ЗАВАНТАЖЕННЯ...' : 'РЕЄСТРАЦІЯ'}
          </button>
        </div>
      </form>
    </div>
  );
};