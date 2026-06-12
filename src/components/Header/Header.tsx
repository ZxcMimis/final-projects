import React from 'react';
import styles from './Header.module.scss';
import { supabase } from '../../services/supabaseClient';

const handleLogout = async () => {
  await supabase.auth.signOut();
};

interface HeaderProps {
  username?: string;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ username = 'User Name', onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <span className={styles['header__logo-text']}>INVESTIQ</span>
      </div>
      
      <div className={styles.header__user}>
        <div className={styles.header__avatar}>{username.charAt(0).toUpperCase()}</div>
        <span className={styles.header__username}>{username}</span>
        
        <div className={styles.header__divider}></div>
        
        <button className={styles.header__logout} onClick={handleLogout}>Вийти</button>
      </div>
    </header>
  );
};

export default Header;