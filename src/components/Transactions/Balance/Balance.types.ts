export interface BalanceProps {
  balance: number;
  onConfirm: (value: number) => void;
  showTooltip?: boolean;
  onTooltipClose?: () => void;
}