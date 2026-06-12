import React, { useState } from 'react';
import './TransactionForm.scss';
import { type TransactionFormProps } from './TransactionTable.types';

const DEFAULT_CATEGORIES = [
  'Продукти',
  'Транспорт',
  'Комунальні',
  'Розваги',
  "Здоров'я",
  'Одяг',
  'Інше',
];

const getTodayFormatted = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}.${month}.${year}`;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  currentDate = getTodayFormatted(),
  categories = DEFAULT_CATEGORIES,
  onSubmit,
  onClear,
}) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    const parsed = parseFloat(amount);
    if (!description.trim() || isNaN(parsed) || parsed <= 0) return;

    // ВАЖЛИВО: Перетворюємо ДД.ММ.ГГГГ на РРРР-ММ-ДД для правильного збереження в БД
    let dbDate = currentDate;
    if (currentDate.includes('.')) {
      const [day, month, year] = currentDate.split('.');
      dbDate = `${year}-${month}-${day}`;
    }

    onSubmit({ 
      date: dbDate, 
      description: description.trim(), 
      category, 
      amount: parsed 
    });
    
    setDescription('');
    setCategory('');
    setAmount('');
  };

  return (
    <div className="txn-form">
      <div className="txn-form__date">
        <span className="txn-form__date-icon">🗓</span>
        <span className="txn-form__date-text">{currentDate}</span>
      </div>

      <div className="txn-form__fields">
        <input
          className="txn-form__desc"
          type="text"
          placeholder="Опис товару"
          value={description}
          onChange={e => setDescription(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />

        <div className="txn-form__sep" />

        <div className="txn-form__cat-wrap">
          <select
            className="txn-form__cat"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">Категорія товару</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="txn-form__cat-arrow">▾</span>
        </div>

        <div className="txn-form__sep" />

        <div className="txn-form__amt-wrap">
          <input
            className="txn-form__amt"
            type="number"
            placeholder="0,00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
          <span className="txn-form__calc">🖩</span>
        </div>
      </div>

      <button className="txn-form__submit" onClick={handleSubmit}>
        ВВЕСТИ
      </button>
      <button className="txn-form__clear" onClick={onClear}>
        ОЧИСТИТИ
      </button>
    </div>
  );
};

export default TransactionForm;