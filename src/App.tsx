import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from './services/supabaseClient';
import { setUser } from './store/authSlice';
import {store} from './store/store';
import './App.css'
import './Styles/reset.scss';
import { AuthPage } from './page/AuthPage/AuthPage';
import ReportPage from './page/ReportsPage/ReportsPage';
import DashboardPage from './page/DashboardPage/DashboardPage';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(session?.user ?? null));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return (
    <div>
  <AuthPage />
  <DashboardPage />
  <ReportPage />
    </div>
  );
};

export default App;