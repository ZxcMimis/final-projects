import React from 'react';
import './CategoryList.scss';
import {
  icon_products, icon_alcohol, icon_fun, icon_health,
  icon_transport, icon_house, icon_machinery, icon_utility,
  icon_sports, icon_teaching, icon_other,
  icon_salary, icon_income,
} from '../../../svg/svg';

export interface CategoryItem {
  id: string;
  label: string;
  amount: number;
}

interface CategoryListProps {
  items: CategoryItem[];
  activeType: 'expense' | 'income';
  onSwitch: (type: 'expense' | 'income') => void;
  activeCategoryId?: string;
  onCategoryClick?: (id: string) => void;
}

const ICON_MAP: Record<string, string> = {
  'ПРОДУКТИ':              icon_products,
  'АЛКОГОЛЬ':              icon_alcohol,
  'РОЗВАГИ':               icon_fun,
  "ЗДОРОВ'Я":              icon_health,
  'ТРАНСПОРТ':             icon_transport,
  'ВСЕ ДЛЯ ДОМУ':          icon_house,
  'ТЕХНІКА':               icon_machinery,
  'КОМУНАЛКА, ЗВ\'ЯЗОК':    icon_utility,
  'СПОРТ, ХОБІ':           icon_sports,
  'НАВЧАННЯ':              icon_teaching,
  'ІНШЕ':                  icon_other,
  'ЗП':                    icon_salary,
  'ДОД. ДОХІД':            icon_income,
};

const CategoryList: React.FC<CategoryListProps> = ({
  items,
  activeType,
  onSwitch,
  activeCategoryId,
  onCategoryClick
}) => {
  return (
    <div className="category-list">
      <div className="category-list__header">
        <button className="category-list__arrow" onClick={() => onSwitch('expense')}>‹</button>
        <span className="category-list__title">
          {activeType === 'expense' ? 'ВИТРАТИ' : 'ДОХОДИ'}
        </span>
        <button className="category-list__arrow" onClick={() => onSwitch('income')}>›</button>
      </div>

      <div className="category-list__grid">
        {items.map(cat => {
          const svgStr = ICON_MAP[cat.label.toUpperCase()] || icon_other;
          const isActive = cat.id === activeCategoryId;
          
          return (
            <div 
              key={cat.id} 
              className={`category-list__item ${isActive ? 'active' : ''}`}
              onClick={() => onCategoryClick?.(cat.id)}
            >
              <span className="category-list__amount">
                {cat.amount.toLocaleString('uk-UA', { minimumFractionDigits: 2 }).replace(',', '.')}
              </span>
              <div 
                className="category-list__icon-wrap"
                dangerouslySetInnerHTML={{ __html: svgStr }}
              />
              <span className="category-list__label">{cat.label.toUpperCase()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;