import React from 'react';
import './CategoryList.scss';
import CategoryIcon from './CategoryIcon';

import {
  icon_products, icon_alcohol, icon_fun, icon_health,
  icon_transport, icon_house, icon_machinery, icon_utility,
  icon_sports, icon_teaching, icon_other,
  icon_salary, icon_income,
} from '../../../svg/svg';

export interface CategoryItem {
  key: string;
  label: string;
  amount: number;
  type: 'expense' | 'income';
}

const ICON_MAP: Record<string, string> = {
  'Продукти':              icon_products,
  'Алкоголь':              icon_alcohol,
  'Розваги':               icon_fun,
  "Здоров'я":              icon_health,
  'Транспорт':             icon_transport,
  'Все для дому':          icon_house,
  'Техніка':               icon_machinery,
  'Комунальні':            icon_utility,
  'Спорт, хобі':           icon_sports,
  'Навчання':              icon_teaching,
  'Інше':                  icon_other,
  '—':                     icon_other,
  // Доходи
  'ЗП':                    icon_salary,
  'Додатковий дохід':      icon_income,
};

interface CategoryListProps {
  items: CategoryItem[];
  activeType: 'expense' | 'income';
  onSwitch: (type: 'expense' | 'income') => void;
  isEmpty?: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
  items,
  activeType,
  onSwitch,
  isEmpty,
}) => {
  return (
    <div className="cat-list">
      <div className="cat-list__header">
        <button className="cat-list__nav" onClick={() => onSwitch('expense')}>‹</button>
        <span className="cat-list__title">
          {activeType === 'expense' ? 'ВИТРАТИ' : 'ДОХОДИ'}
        </span>
        <button className="cat-list__nav" onClick={() => onSwitch('income')}>›</button>
      </div>

      {isEmpty || items.length === 0 ? (
        <div className="cat-list__empty">Немає транзакцій за цей місяць</div>
      ) : (
        <div className="cat-list__grid">
          {items.map(cat => {
            const svg = ICON_MAP[cat.label] || ICON_MAP['—'];
            return (
              <div key={cat.key} className="cat-list__item">
                <span className="cat-list__amount">
                  {cat.amount.toLocaleString('uk-UA', { minimumFractionDigits: 2 })}
                </span>
                <div className="cat-list__icon-wrap">
                  <CategoryIcon svgString={svg} size={48} />
                </div>
                <span className="cat-list__label">{cat.label.toUpperCase()}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryList;