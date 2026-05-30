import React from 'react';
import './SummaryBoard.scss';

export interface MonthSummary {
  month: string; 
  value: number;
}

interface SummaryBoardProps {
  months: MonthSummary[];
}

const SummaryBoard: React.FC<SummaryBoardProps> = ({ months }) => {
  return (
    <div className="summary">
      <div className="summary__head">
        <span className="summary__title">ЗВЕДЕННЯ</span>
      </div>

      <ul className="summary__list">
        {months.map(item => (
          <li key={item.month} className="summary__row">
            <span className="summary__month">{item.month}</span>
            <span className="summary__value">
              {item.value.toLocaleString('uk-UA', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SummaryBoard;