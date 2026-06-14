import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { supabase } from '../../services/supabaseClient';
import './ReportsPage.scss';

import Header from '../../components/Header/Header';
import MonthSelector from '../../components/Reports/MonthSelector/MonthSelector';
import CategoryList, { type CategoryItem } from '../../components/Reports/CategoryList/CategoryList';
import Charts from '../../components/Reports/Charts/Charts';

const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items: transactions } = useSelector((state: RootState) => state.transactions);

  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [username, setUsername] = useState("");
  const [initialBalance, setInitialBalance] = useState<number>(() => {
    const saved = localStorage.getItem("investiq_user_balance");
    return saved ? parseFloat(saved) : 0;
  });

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

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
          }
        }
      }
    };
    fetchProfileData();
  }, [user]);

  const balance = useMemo(() => {
    const txSum = transactions.reduce((acc, curr) => {
      return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
    }, 0);
    return initialBalance + txSum;
  }, [transactions, initialBalance]);

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  /* ВИПРАВЛЕНА ПОМИЛКА TYPESCRIPT */
  const parseDate = (dateStr: string) => {
    if (dateStr.includes('.')) {
      const [day, month, year] = dateStr.split('.');
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateStr);
  };

  const monthlyTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (!t.date) return false;
      const txDate = parseDate(t.date);
      return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
    });
  }, [transactions, currentMonth, currentYear]);

  const { totalExpense, totalIncome } = useMemo(() => {
    let expense = 0;
    let income = 0;
    monthlyTransactions.forEach(t => {
      if (t.type === 'expense') expense += t.amount;
      if (t.type === 'income') income += t.amount;
    });
    return { totalExpense: expense, totalIncome: income };
  }, [monthlyTransactions]);

  const currentTabTransactions = useMemo(() => {
    return monthlyTransactions.filter(t => t.type === activeTab);
  }, [monthlyTransactions, activeTab]);

  const categoryItems: CategoryItem[] = useMemo(() => {
    const groups: Record<string, number> = {};
    currentTabTransactions.forEach(t => {
      const cat = t.category || 'Інше';
      groups[cat] = (groups[cat] || 0) + t.amount;
    });

    return Object.entries(groups)
      .map(([label, amount]) => ({
        id: label,
        label,
        amount
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [currentTabTransactions]);

  useEffect(() => {
    if (categoryItems.length > 0) {
      if (!categoryItems.find(c => c.id === activeCategoryId)) {
        setActiveCategoryId(categoryItems[0].id);
      }
    } else {
      setActiveCategoryId('');
    }
  }, [categoryItems, activeTab, activeCategoryId]);

  const chartData = useMemo(() => {
    if (!activeCategoryId) return [];
    
    const categoryTxns = currentTabTransactions.filter(t => (t.category || 'Інше') === activeCategoryId);
    const groups: Record<string, number> = {};
    
    categoryTxns.forEach(t => {
      const desc = t.description || 'Без опису';
      groups[desc] = (groups[desc] || 0) + t.amount;
    });

    return Object.entries(groups)
      .map(([label, amount]) => ({ label, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [currentTabTransactions, activeCategoryId]);

  const displayName = username || user?.user_metadata?.name || user?.user_metadata?.full_name || user?.user_metadata?.username || user?.email?.split('@')[0] || "Користувач";

  return (
    <div className="reports-layout">
      {/* СІРИЙ ФОН ІЗ ЗАОКРУГЛЕННЯМ ЗВЕРХУ */}
      <div className="top-background-shape"></div>
      
      {/* ПАТЕРН ІЗ КАРТИНКАМИ ЗНИЗУ */}
      <div className="background-pattern"></div>

      <Header username={displayName} />
      
      <div className="reports-page">
        <div className="reports-page__container">
          
          <div className="reports-page__top-nav">
            <button className="reports-page__back-btn" onClick={() => navigate('/')}>
              <span className="arrow">←</span> Повернутись на головну
            </button>

            <div className="reports-page__balance-widget">
              <span className="label">Баланс:</span>
              <div className="pill">{balance.toFixed(2)} UAH</div>
              <button className="confirm-btn">ПІДТВЕРДИТИ</button>
            </div>

            <div className="reports-page__month-wrap">
              <MonthSelector 
                currentDate={currentDate} 
                onPrev={handlePrevMonth} 
                onNext={handleNextMonth} 
              />
            </div>
          </div>

          <div className="reports-page__summary">
            <div className="summary-item">
              <span className="summary-label">Витрати:</span>
              <span className="summary-value expense">- {totalExpense.toFixed(2)} грн.</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-item">
              <span className="summary-label">Доходи:</span>
              <span className="summary-value income">+ {totalIncome.toFixed(2)} грн.</span>
            </div>
          </div>

          <CategoryList 
            items={categoryItems} 
            activeType={activeTab} 
            onSwitch={(type) => setActiveTab(type)}
            activeCategoryId={activeCategoryId}
            onCategoryClick={setActiveCategoryId}
          />

          {chartData.length > 0 ? (
            <Charts data={chartData} />
          ) : (
            <div style={{ textAlign: 'center', color: '#a6abb9', padding: '40px' }}>
              Немає даних для графіка
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;