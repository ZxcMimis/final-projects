import React, { useState } from 'react';
import styles from './DashboardPage.module.scss';

import Header from '../../components/Header/Header';
import Balance from '../../components/Transactions/Balance/Balance';
import TransactionForm from '../../components/Transactions/TransactionForm/TransactionForm';
import TransactionTable, {
  type Transaction,
} from '../../components/Transactions/TransactionTable/TransactionTable';
import SummaryBoard, {
  type MonthSummary,
} from '../../components/Transactions/SummaryBoard/SummaryBoard';

type TabType = 'expense' | 'income';

const MONTH_SUMMARY: MonthSummary[] = [
  { month: 'ЛИСТОПАД', value: 10000 },
  { month: 'ЖОВТЕНЬ',  value: 30000 },
  { month: 'ВЕРЕСЕНЬ', value: 30000 },
  { month: 'СЕРПЕНЬ',  value: 20000 },
  { month: 'ЛИПЕНЬ',   value: 15000 },
  { month: 'ЧЕРВЕНЬ',  value: 18000 },
];

const DashboardPage: React.FC = () => {
  const [balance, setBalance]           = useState(0);
  const [showTooltip, setShowTooltip]   = useState(true);
  const [activeTab, setActiveTab]       = useState<TabType>('expense');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleBalanceConfirm = (value: number) => {
    setBalance(value);
    setShowTooltip(false);
  };

  const handleTransactionSubmit = (data: {
    date: string;
    description: string;
    category: string;
    amount: number;
  }) => {
    const newTxn: Transaction = {
      id: String(Date.now()),
      date: data.date,
      description: data.description,
      category: data.category,
      amount: data.amount,
      type: activeTab,
    };
    setTransactions(prev => [newTxn, ...prev]);
    setBalance(prev =>
      activeTab === 'income' ? prev + data.amount : prev - data.amount
    );
  };

  const handleDelete = (id: string) => {
    const txn = transactions.find(t => t.id === id);
    if (txn) {
      setBalance(prev =>
        txn.type === 'income' ? prev - txn.amount : prev + txn.amount
      );
    }
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleClear = () => setTransactions([]);

  const filtered = transactions.filter(t => t.type === activeTab);

  return (
    <div className={styles.dashboard}>
      <Header username="User Name" />

      <main className={styles.main}>
        <div className={styles.topbar}>
          <Balance
            balance={balance}
            onConfirm={handleBalanceConfirm}
            showTooltip={showTooltip}
            onTooltipClose={() => setShowTooltip(false)}
          />
          <button className={styles.reportsBtn}>
            Перейти до розрахунків&nbsp;📊
          </button>
        </div>

        <div className={styles.card}>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'expense' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('expense')}
            >
              Витрати
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'income' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('income')}
            >
              Дохід
            </button>
          </div>

          <TransactionForm
            onSubmit={handleTransactionSubmit}
            onClear={handleClear}
          />

          <div className={styles.content}>
            <TransactionTable
              transactions={filtered}
              onDelete={handleDelete}
            />
            <SummaryBoard months={MONTH_SUMMARY} />
          </div>
        </div>
      </main>

      <div className={styles.bgIcons} aria-hidden="true">
        <span>💰</span>
        <span>📈</span>
        <span>💳</span>
        <span>📊</span>
        <span>💵</span>
      </div>
    </div>
  );
};

export default DashboardPage;