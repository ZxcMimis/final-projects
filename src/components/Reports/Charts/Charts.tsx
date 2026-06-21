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
  const chartHeight = 180; 

  const gridLines = Array.from({ length: 5 }).map((_, i) => 
    maxAmount - (maxAmount / 4) * i
  );

  return (
    <div className="charts">
      <div className="charts__wrapper">
        
        <div className="charts__grid">
          {gridLines.map((_line, i) => (
            <div key={i} className="charts__grid-line"></div>
          ))}
        </div>

        <div className="charts__bars">
          {data.map((item, index) => {
            const height = (item.amount / maxAmount) * chartHeight;
            const percent = Math.max((item.amount / maxAmount) * 100, 2);
            const isOrange = index % 3 === 0; 
            
            return (
              <div key={index} className="charts__bar-group">
                <span className="charts__bar-value">
                  {item.amount.toLocaleString('uk-UA', { minimumFractionDigits: 0 }).replace(',', '.')} грн
                </span>
                <div
                  className={`charts__bar ${isOrange ? 'charts__bar--orange' : 'charts__bar--pale'}`}
                  style={{ height: `${height}px`, width: `${percent}%` }}
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