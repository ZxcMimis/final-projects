import React, { useState } from 'react';
import styles from './Balance.module.scss';

interface BalanceProps {
  balance: number;
  onConfirm: (value: number) => void;
  showTooltip?: boolean;
  onTooltipClose?: () => void;
}

const Balance: React.FC<BalanceProps> = ({ balance, onConfirm, showTooltip, onTooltipClose }) => {
  const [inputValue, setInputValue] = useState(balance.toFixed(2));

  const handleConfirm = () => {
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      onConfirm(parsed);
      onTooltipClose?.();
    }
  };

  return (
    <div className={styles.balance}>
      <span className={styles.balance__label}>Баланс:</span>
      <div className={styles['balance__input-wrap']}>
        <input
          className={styles.balance__input}
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <span className={styles.balance__currency}>UAH</span>
      </div>
      <button className={styles.balance__confirm} onClick={handleConfirm}>
        ПІДТВЕРДИТИ
      </button>

      {showTooltip && (
        <div className={styles.balance__tooltip}>
          <p>
            <strong>Привіт!</strong> Для початку роботи внесіть свій поточний баланс рахунку!
          </p>
          <p>Ви не можете витрачати гроші, поки їх у Вас немає :)</p>
        </div>
      )}
    </div>
  );
};

export default Balance;