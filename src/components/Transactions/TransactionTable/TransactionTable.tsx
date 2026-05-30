import React from 'react';
import './TransactionTable.scss';

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
  onDelete?: (id: string) => void;
}

const EMPTY_ROWS = 5;

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onDelete }) => {
  return (
    <div className="txn-table">
      <div className="txn-table__head">
        <span>ДАТА</span>
        <span>ОПИС</span>
        <span>КАТЕГОРІЯ</span>
        <span>СУМА</span>
        <span />
      </div>

      <div className="txn-table__body">
        {transactions.length === 0
          ? Array.from({ length: EMPTY_ROWS }).map((_, i) => (
              <div key={i} className="txn-table__row txn-table__row--empty" />
            ))
          : transactions.map(txn => (
              <div key={txn.id} className="txn-table__row">
                <span className="txn-table__date">{txn.date}</span>
                <span className="txn-table__desc">{txn.description}</span>
                <span className="txn-table__cat">{txn.category || '—'}</span>
                <span className={`txn-table__amount txn-table__amount--${txn.type}`}>
                  {txn.type === 'expense' ? '- ' : '+ '}
                  {txn.amount.toFixed(2)} грн.
                </span>
                {onDelete && (
                  <button
                    className="txn-table__del"
                    onClick={() => onDelete(txn.id)}
                    title="Видалити"
                  >
                    🗑
                  </button>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default TransactionTable;