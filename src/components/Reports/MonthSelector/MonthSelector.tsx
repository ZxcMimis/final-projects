import React from 'react';
import './MonthSelector.scss';

const MONTHS_NAMES = [
  "СІЧЕНЬ", "ЛЮТИЙ", "БЕРЕЗЕНЬ", "КВІТЕНЬ", "ТРАВЕНЬ", "ЧЕРВЕНЬ",
  "ЛИПЕНЬ", "СЕРПЕНЬ", "ВЕРЕСЕНЬ", "ЖОВТЕНЬ", "ЛИСТОПАД", "ГРУДЕНЬ"
];

interface MonthSelectorProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ currentDate, onPrev, onNext }) => {
  const monthName = MONTHS_NAMES[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <div className="month-selector">
      <span className="month-selector__label">Поточний період</span>
      <div className="month-selector__controls">
        <button className="month-selector__arrow" onClick={onPrev}>‹</button>
        <span className="month-selector__date">{monthName} {year}</span>
        <button className="month-selector__arrow" onClick={onNext}>›</button>
      </div>
    </div>
  );
};

export default MonthSelector;