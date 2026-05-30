import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...rest }) => (
  <div className={`ui-input ${error ? 'ui-input--error' : ''} ${className}`}>
    {label && <label className="ui-input__label">{label}</label>}
    <input className="ui-input__field" {...rest} />
    {error && <span className="ui-input__error">{error}</span>}
  </div>
);

export default Input;