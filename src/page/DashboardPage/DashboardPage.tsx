import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../services/supabaseClient";
import { type RootState } from "../../store/store";
import { fetchTransactions, addTransaction, deleteTransaction } from "../../store/transactionsSlice";
import styles from "./DashboardPage.module.scss";

import Header from "../../components/Header/Header";
import Balance from "../../components/Transactions/Balance/Balance";
import TransactionForm from "../../components/Transactions/TransactionForm/TransactionForm";
import TransactionTable from "../../components/Transactions/TransactionTable/TransactionTable";
import SummaryBoard from "../../components/Transactions/SummaryBoard/SummaryBoard";

type TabType = "expense" | "income";

const MONTHS_NAMES = [
  "СІЧЕНЬ", "ЛЮТИЙ", "БЕРЕЗЕНЬ", "КВІТЕНЬ", "ТРАВЕНЬ", "ЧЕРВЕНЬ",
  "ЛИПЕНЬ", "СЕРПЕНЬ", "ВЕРЕСЕНЬ", "ЖОВТЕНЬ", "ЛИСТОПАД", "ГРУДЕНЬ"
];

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items: transactions } = useSelector((state: RootState) => state.transactions);

  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("expense");
  const [initialBalance, setInitialBalance] = useState<number>(() => {
    const saved = localStorage.getItem("investiq_user_balance");
    return saved ? parseFloat(saved) : 0;
  });
  const [showTooltip, setShowTooltip] = useState(() => {
    const saved = localStorage.getItem("investiq_user_balance");
    return !saved;
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("username, balance")
          .eq("id", user.id)
          .single();

        if (data) {
          if (data.username) setUsername(data.username);
          if (data.balance !== undefined && data.balance !== null) {
            setInitialBalance(data.balance);
            localStorage.setItem("investiq_user_balance", data.balance.toString());
            setShowTooltip(false);
          }
        }
        dispatch(fetchTransactions(user.id));
      }
    };
    fetchProfileData();
  }, [user, dispatch]);

  const calculatedBalance = useMemo(() => {
    const txSum = transactions.reduce((acc, curr) => {
      return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
    }, 0);
    return initialBalance + txSum;
  }, [transactions, initialBalance]);

  const handleBalanceConfirm = async (value: number) => {
    setInitialBalance(value);
    localStorage.setItem("investiq_user_balance", value.toString());
    setShowTooltip(false);
    if (user) {
      await supabase
        .from("profiles")
        .update({ balance: value })
        .eq("id", user.id);
    }
  };

  const handleTransactionSubmit = (data: {
    date: string;
    description: string;
    category: string;
    amount: number;
  }) => {
    if (!user) return;

    dispatch(
      addTransaction({
        date: data.date,
        description: data.description,
        category: data.category,
        amount: data.amount,
        type: activeTab,
        user_id: user.id,
      })
    );
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  const handleClear = () => {};

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const parseDate = (dateStr: string) => {
    if (dateStr.includes('.')) {
      const [day, month, year] = dateStr.split('.');
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateStr);
  };

  const filtered = transactions.filter((t) => {
    if (!t.date) return false;
    const txDate = parseDate(t.date);
    
    if (isNaN(txDate.getTime())) return false;

    return (
      t.type === activeTab &&
      txDate.getMonth() === currentMonth &&
      txDate.getFullYear() === currentYear
    );
  });

  const displayName = username || user?.user_metadata?.name || user?.user_metadata?.full_name || user?.user_metadata?.username || user?.email?.split('@')[0] || "Користувач";

  const monthSummary = useMemo(() => {
    return Array.from({ length: 6 }).map((_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - index);
      const m = date.getMonth();
      const y = date.getFullYear();

      const totalValue = transactions
        .filter((t) => {
          if (!t.date) return false;
          const txDate = parseDate(t.date);
          
          if (isNaN(txDate.getTime())) return false;
          
          return (
            t.type === activeTab &&
            txDate.getMonth() === m &&
            txDate.getFullYear() === y
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month: MONTHS_NAMES[m],
        value: totalValue,
      };
    });
  }, [transactions, activeTab]);

  return (
    <div className={styles.dashboard}>
      <Header username={displayName} />

      <main className={styles.main}>
        <div className={styles.topbar}>
          <Balance
            balance={calculatedBalance}
            onConfirm={handleBalanceConfirm}
            showTooltip={showTooltip}
            onTooltipClose={() => setShowTooltip(false)}
          />
          <button 
            className={styles.reportsBtn}
            onClick={() => navigate('/reports')}
          >
            Перейти до розрахунків&nbsp;📊
          </button>
        </div>

        <div className={styles.card}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "expense" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("expense")}
            >
              Витрати
            </button>
            <button
              className={`${styles.tab} ${activeTab === "income" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("income")}
            >
              Дохід
            </button>
          </div>

          <TransactionForm
            onSubmit={handleTransactionSubmit}
            onClear={handleClear}
          />

          <div className={styles.content}>
            <TransactionTable transactions={filtered as any} onDelete={handleDelete} />
            <SummaryBoard months={monthSummary} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;