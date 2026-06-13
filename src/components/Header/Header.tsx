import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { supabase } from '../../services/supabaseClient';

interface HeaderProps {
  username?: string;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ username = 'Користувач', onLogout }) => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const handleLogoutClick = async () => {
    setShowNotification(true);
    
    setTimeout(async () => {
      setShowNotification(false);
      await supabase.auth.signOut();
      
      if (onLogout) onLogout();
      
      window.location.href = '/auth';
    }, 2000);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className={styles['header__logo-text']}>INVESTIQ</span>
        </div>
        
        <div className={styles.header__user}>
          <div className={styles.header__avatar}>{username ? username.charAt(0).toUpperCase() : 'U'}</div>
          <span className={styles.header__username}>{username}</span>
          
          <div className={styles.header__divider}></div>
          
          <button className={styles.header__logout} onClick={handleLogoutClick}>Вийти</button>
        </div>
      </header>

      {showNotification && (
        <div className={styles.notificationOverlay}>
          <div className={styles.notificationBox}>
            <span className={styles.icon}>👋</span>
            <p>Ви успішно вийшли з системи!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;