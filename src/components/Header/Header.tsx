import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        {/* Маленька помаранчева іконка з макета */}
        <div className={styles.iconPlaceholder}></div> 
        <span className={styles.logoText}>INVESTIQ</span>
      </div>

      <div className={styles.userContainer}>
        <div className={styles.avatar}>U</div>
        <span className={styles.userName}>User Name</span>
        <div className={styles.divider}></div>
        <button className={styles.logoutBtn}>Вийти</button>
      </div>
    </header>
  );
};