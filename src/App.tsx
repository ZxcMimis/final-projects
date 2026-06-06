import './App.css'
import './Styles/reset.scss';
import { AuthPage } from './page/AuthPage/AuthPage';
import ReportPage from './page/ReportsPage/ReportsPage';
import DashboardPage from './page/DashboardPage/DashboardPage';



function App() {

  return (
    <>
  <AuthPage />
  <DashboardPage />
  <ReportPage />
    </>
  )
}

export default App
