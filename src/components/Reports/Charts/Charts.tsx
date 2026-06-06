import React from 'react';
import './Charts.scss';

interface ChartItem {
  label: string;
  amount: number;
}

interface ChartsProps {
  data: ChartItem[];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const maxAmount = Math.max(...data.map(d => d.amount));
  const chartHeight = 250; // Максимальная высота столбца в пикселях

  // Создаем 5 уровней сетки (от максимума до нуля)
  const gridLines = Array.from({ length: 5 }).map((_, i) => 
    maxAmount - (maxAmount / 4) * i
  );

  return (
    <div className="charts">
      <div className="charts__wrapper">
        
        {/* Горизонтальная сетка */}
        <div className="charts__grid">
          {gridLines.map((line, i) => (
            <div key={i} className="charts__grid-line"></div>
          ))}
        </div>

        {/* Столбцы */}
        <div className="charts__bars">
          {data.map((item, index) => {
            const height = (item.amount / maxAmount) * chartHeight;
            // Каждая третья колонка оранжевая, остальные светло-оранжевые
            const isOrange = index % 3 === 0; 
            
            return (
              <div key={index} className="charts__bar-group">
                <span className="charts__bar-value">
                  {item.amount.toLocaleString('uk-UA', { minimumFractionDigits: 0 }).replace(',', '.')} грн
                </span>
                <div
                  className={`charts__bar ${isOrange ? 'charts__bar--orange' : 'charts__bar--pale'}`}
                  style={{ height: `${height}px` }}
                ></div>
                <span className="charts__bar-label">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Charts;