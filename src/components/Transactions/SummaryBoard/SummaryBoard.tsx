import React from 'react';
import styles from './SummaryBoard.module.scss';

interface SummaryBoardProps {
  totalExpense: number;
  totalIncome: number;
  balance: number;
}

const SummaryBoard: React.FC<SummaryBoardProps> = ({ totalExpense, totalIncome, balance }) => {
  return (
    <div className={styles.summary}>
      <h3 className={styles.summary__title}>ЗВЕДЕННЯ</h3>
      
      <div className={styles.summary__content}>
        <div className={styles.summary__item}>
          <span className={styles['summary__item-label']}>Доходи:</span>
          <span className={`${styles['summary__item-value']} ${styles['summary__item-value--income']}`}>
            +{totalIncome.toFixed(2)} UAH
          </span>
        </div>

        <div className={styles.summary__item}>
          <span className={styles['summary__item-label']}>Витрати:</span>
          <span className={`${styles['summary__item-value']} ${styles['summary__item-value--expense']}`}>
            -{totalExpense.toFixed(2)} UAH
          </span>
        </div>

        <div className={styles.summary__divider}></div>

        <div className={`${styles.summary__item} ${styles['summary__item--total']}`}>
          <span className={styles['summary__item-label']}>Залишок:</span>
          <span className={styles['summary__item-value']}>
            {balance.toFixed(2)} UAH
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryBoard;