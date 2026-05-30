import React from 'react';
import styles from './TransactionTable.module.scss';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'expense' | 'income';
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className={styles['txn-table']}>

      <div className={styles['txn-table__header']}>
        <span>ДАТА</span>
        <span>ОПИС</span>
        <span>КАТЕГОРІЯ</span>
        <span>СУМА</span>
      </div>


      <div className={styles['txn-table__body']}>

        {transactions.length === 0 && (
          <div className={styles['txn-table__body-empty-scroll']} />
        )}

        {transactions.length === 0 ? (

          Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`${styles['txn-table__row']} ${styles['txn-table__row--empty']}`} />
          ))
        ) : (

          transactions.map(txn => (
            <div key={txn.id} className={styles['txn-table__row']}>
              <span className={styles['txn-table__date']}>{txn.date}</span>
              <span className={styles['txn-table__desc']}>{txn.description}</span>
              <span className={styles['txn-table__category']}>{txn.category}</span>
              <span className={`${styles['txn-table__amount']} ${styles[`txn-table__amount--${txn.type}`]}`}>
                {txn.type === 'expense' ? '-' : '+'}
                {txn.amount.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionTable;