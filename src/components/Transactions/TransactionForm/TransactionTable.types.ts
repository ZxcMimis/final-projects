export interface TransactionFormData {
  date: string;
  description: string;
  category: string;
  amount: number;
}

export interface TransactionFormProps {
  currentDate?: string;
  categories?: string[];
  onSubmit: (data: TransactionFormData) => void;
  onClear: () => void;
}