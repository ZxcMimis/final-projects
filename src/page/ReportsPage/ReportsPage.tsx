import React, { useState } from 'react';
import './ReportsPage.scss';

import Header from '../../components/Header/Header';
import MonthSelector from '../../components/Reports/MonthSelector/MonthSelector';
import CategoryList, { type CategoryItem } from '../../components/Reports/CategoryList/CategoryList';
import Charts from '../../components/Reports/Charts/Charts';

const MOCK_EXPENSE_CATEGORIES: CategoryItem[] = [
  { id: '1', label: 'Продукти', amount: 5000.00 },
  { id: '2', label: 'Алкоголь', amount: 200.00 },
  { id: '3', label: 'Розваги', amount: 800.00 },
  { id: '4', label: "Здоров'я", amount: 900.00 },
  { id: '5', label: 'Транспорт', amount: 2000.00 },
  { id: '6', label: 'Все для дому', amount: 1500.00 },
  { id: '7', label: 'Техніка', amount: 800.00 },
  { id: '8', label: "Комуналка, зв'язок", amount: 2200.00 },
  { id: '9', label: 'Спорт, хобі', amount: 1800.00 },
  { id: '10', label: 'Навчання', amount: 2400.00 },
  { id: '11', label: 'Інше', amount: 3000.00 },
];

const MOCK_INCOME_CATEGORIES: CategoryItem[] = [
  { id: 'in1', label: 'ЗП', amount: 45000.00 },
  { id: 'in2', label: 'Дод. дохід', amount: 1500.00 },
];

const MOCK_EXPENSES_CHART = [
  { label: 'Свинина', amount: 5000 },
  { label: 'Гов\'ядина', amount: 4500 },
  { label: 'Курятина', amount: 3200 },
  { label: 'Риба', amount: 2100 },
  { label: 'Паніні', amount: 1800 },
  { label: 'Кава', amount: 1700 },
  { label: 'Спагетті', amount: 1500 },
  { label: 'Шоколад', amount: 800 },
  { label: 'Маслини', amount: 500 },
  { label: 'Зелень', amount: 300 },
];

const MOCK_INCOME_CHART = [
  { label: 'Моя', amount: 25000 },
  { label: 'Дружини', amount: 20000 },
];

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('1');

  const categories = activeTab === 'expense' ? MOCK_EXPENSE_CATEGORIES : MOCK_INCOME_CATEGORIES;
  const chartData = activeTab === 'expense' ? MOCK_EXPENSES_CHART : MOCK_INCOME_CHART;

  return (
    <>
      <Header username="User Name" />
      
      <div className="reports-page">
        <div className="reports-page__container">
          
          <div className="reports-page__top-nav">
            <button className="reports-page__back-btn">
              <span className="arrow">←</span> Повернутись на головну
            </button>

            <div className="reports-page__balance-widget">
              <span className="label">Баланс:</span>
              <div className="pill">55 000.00 UAH</div>
              <button className="confirm-btn">ПІДТВЕРДИТИ</button>
            </div>

            <div className="reports-page__month-wrap">
              <MonthSelector />
            </div>
          </div>

          <div className="reports-page__summary">
            <div className="summary-item">
              <span className="summary-label">Витрати:</span>
              <span className="summary-value expense">- 18 000.00 грн.</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-item">
              <span className="summary-label">Доходи:</span>
              <span className="summary-value income">+ 45 000.00 грн.</span>
            </div>
          </div>

          <CategoryList 
            items={categories} 
            activeType={activeTab} 
            onSwitch={(type) => {
              setActiveTab(type);
              setActiveCategoryId(type === 'expense' ? '1' : 'in1');
            }}
            activeCategoryId={activeCategoryId}
            onCategoryClick={setActiveCategoryId}
          />

          <Charts data={chartData} />
          
        </div>
      </div>
    </>
  );
};

export default ReportsPage;