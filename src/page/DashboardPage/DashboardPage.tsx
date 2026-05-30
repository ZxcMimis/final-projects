import React, { useState } from 'react';
import styles from './DashboardPage.module.scss';
import Header from '../../components/Header/Header'
import Balance from '../../components/Transactions/Balance/Balance';
import TransactionForm from '../../components/Transactions/TransactionForm/TransactionForm';
import TransactionTable, {type Transaction } from '../../components/Transactions/TransactionTable/TransactionTable';
import SummaryBoard from '../../components/Transactions/SummaryBoard/SummaryBoard';

const CATEGORIES = ['Їжа', 'Транспорт', 'Комунальні', 'Розваги', 'Здоров\'я', 'Одяг', 'Інше'];

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
  const [balance, setBalance] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
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
      id: Date.now().toString(),
      ...data,
      type: activeTab,
    };
    setTransactions(prev => [newTxn, ...prev]);
    setBalance(prev =>
      activeTab === 'expense' ? prev - data.amount : prev + data.amount
    );
  };

  const handleClear = () => setTransactions([]);

  const filtered = transactions.filter(t => t.type === activeTab);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

  return (
    <div className={styles.dashboard}>
      <Header username="User Name" />

      <main className={styles.dashboard__main}>
        <div className={styles.dashboard__topbar}>
          <Balance
            balance={balance}
            onConfirm={handleBalanceConfirm}
            showTooltip={showTooltip}
            onTooltipClose={() => setShowTooltip(false)}
          />
          <button className={styles['dashboard__reports-btn']}>
            Перейти до розрахунків
            <span className={styles['dashboard__reports-icon']}>📊</span>
          </button>
        </div>

        <div className={styles.dashboard__tabs}>
          <button
            className={`${styles.dashboard__tab} ${activeTab === 'expense' ? styles['dashboard__tab--active'] : ''}`}
            onClick={() => setActiveTab('expense')}
          >
            ВИТРАТИ
          </button>
          <button
            className={`${styles.dashboard__tab} ${activeTab === 'income' ? styles['dashboard__tab--active'] : ''}`}
            onClick={() => setActiveTab('income')}
          >
            ДОХІД
          </button>
        </div>

        <div className={styles.dashboard__card}>

          <TransactionForm
            onSubmit={handleTransactionSubmit}
            onClear={handleClear}
            categories={CATEGORIES}
          />

          <div className={styles.dashboard__content}>
            <TransactionTable transactions={filtered} />
            <SummaryBoard
              totalExpense={totalExpense}
              totalIncome={totalIncome}
              balance={balance}
            />
          </div>
        </div>
      </main>


    </div>
  );
};

