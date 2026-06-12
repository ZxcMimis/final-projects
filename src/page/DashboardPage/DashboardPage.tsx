import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../services/supabaseClient";
import { type RootState } from "../../store/store";
import { fetchTransactions, addTransaction, deleteTransaction } from "../../store/transactionsSlice";
import styles from "./DashboardPage.module.scss";

import Header from "../../components/Header/Header";
import Balance from "../../components/Transactions/Balance/Balance";
import TransactionForm from "../../components/Transactions/TransactionForm/TransactionForm";
import TransactionTable from "../../components/Transactions/TransactionTable/TransactionTable";
import SummaryBoard, {
  type MonthSummary,
} from "../../components/Transactions/SummaryBoard/SummaryBoard";

type TabType = "expense" | "income";

const MONTH_SUMMARY: MonthSummary[] = [
  { month: "ЛИСТОПАД", value: 10000 },
  { month: "ЖОВТЕНЬ", value: 30000 },
  { month: "ВЕРЕСЕНЬ", value: 30000 },
  { month: "СЕРПЕНЬ", value: 20000 },
  { month: "ЛИПЕНЬ", value: 15000 },
  { month: "ЧЕРВЕНЬ", value: 18000 },
];

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items: transactions } = useSelector((state: RootState) => state.transactions);

  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("expense");

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();

        if (data) setUsername(data.username);
        dispatch(fetchTransactions(user.id));
      }
    };
    fetchProfileData();
  }, [user, dispatch]);

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

    setBalance((prev) =>
      activeTab === "income" ? prev + data.amount : prev - data.amount
    );
  };

  const handleDelete = (id: string) => {
    const txn = transactions.find((t) => t.id === id);
    if (txn) {
      setBalance((prev) =>
        txn.type === "income" ? prev - txn.amount : prev + txn.amount
      );
    }
    dispatch(deleteTransaction(id));
  };

  const handleClear = () => {};

  const filtered = transactions.filter((t) => t.type === activeTab);

  return (
    <div className={styles.dashboard}>
      <Header username={username || "User"} />

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
            <SummaryBoard months={MONTH_SUMMARY} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;