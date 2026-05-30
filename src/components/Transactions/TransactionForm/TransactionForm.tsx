import React, { useState } from 'react';
import styles from './TransactionForm.module.scss';

interface TransactionFormProps {
  onSubmit: (data: { date: string; description: string; category: string; amount: number }) => void;
  onClear: () => void;
  categories: string[];
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, onClear, categories }) => {
  const [date, setDate] = useState('21.11.2019');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (!description || !amount) return;
    onSubmit({ date, description, category, amount: parseFloat(amount) });
    setDescription('');
    setCategory('');
    setAmount('');
  };

  return (
    <div className={styles['txn-form']}>
      <div className={styles['txn-form__date']}>
        <span className={styles['txn-form__date-icon']}>📅</span>
        <input
          type="text"
          value={date}
          onChange={e => setDate(e.target.value)}
          className={styles['txn-form__date-input']}
        />
      </div>

      <input
        type="text"
        className={styles['txn-form__desc']}
        placeholder="Опис товару"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <select
        className={styles['txn-form__category']}
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="">Категорія</option>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="number"
        className={styles['txn-form__amount']}
        placeholder="Сума"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <button className={styles['txn-form__submit']} onClick={handleSubmit}>ВВЕСТИ</button>
      <button className={styles['txn-form__clear']} onClick={onClear}>ОЧИСТИТИ</button>
    </div>
  );
};

export default TransactionForm;