import React from 'react';
import './MonthSelector.scss';

const MonthSelector: React.FC = () => {
  return (
    <div className="month-selector">
      <span className="month-selector__label">Поточний період</span>
      <div className="month-selector__controls">
        <button className="month-selector__arrow">‹</button>
        <span className="month-selector__date">ЛИСТОПАД 2019</span>
        <button className="month-selector__arrow">›</button>
      </div>
    </div>
  );
};

export default MonthSelector;