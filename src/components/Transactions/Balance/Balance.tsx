import React, { useState, useRef, useEffect } from 'react';
import './Balance.scss';
import { type BalanceProps } from './Balance.types';


const Balance: React.FC<BalanceProps> = ({
  balance,
  onConfirm,
  showTooltip,
  onTooltipClose,
}) => {
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState(String(balance));
  const inputRef = useRef<HTMLInputElement>(null);


  const handleConfirmClick = () => {
    if (editing) {
      const v = parseFloat(inputVal);
      if (!isNaN(v)) onConfirm(v);
      setEditing(false);
      onTooltipClose?.();
    } else {
      setInputVal(String(balance));
      setEditing(true);
    }
  };

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleConfirmClick();
    if (e.key === 'Escape') setEditing(false);
  };

  const formatted = balance.toLocaleString('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="balance">
      <div className="balance__frame">
        <span className="balance__label">Баланс:</span>
        <span className="balance__value">{formatted} UAH</span>
        <button className="balance__confirm" onClick={handleConfirmClick}>
          ПІДТВЕРДИТИ
        </button>
      </div>

      {editing && (
        <input
          ref={inputRef}
          className="balance__edit"
          type="number"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введіть баланс"
        />
      )}

      {showTooltip && !editing && (
        <div className="balance__tooltip">
          <p>
            <strong>Привіт!</strong> Для початку роботи внесіть свій поточний
            баланс рахунку!
          </p>
          <p>Ви не можете витрачати гроші, поки їх у Вас немає :)</p>
        </div>
      )}
    </div>
  );
};

export default Balance;