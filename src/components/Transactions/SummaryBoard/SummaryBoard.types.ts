export interface MonthSummary {
  month: string; 
  value: number;
}

export interface SummaryBoardProps {
  months: MonthSummary[];
}