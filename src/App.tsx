import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from './services/supabaseClient';
import { setUser } from './store/authSlice';
import { type RootState } from './store/store';
import './App.css';
import './Styles/reset.scss';
import { AuthPage } from './page/AuthPage/AuthPage';
import ReportPage from './page/ReportsPage/ReportsPage';
import DashboardPage from './page/DashboardPage/DashboardPage';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

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
    <Routes>
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" replace />} />
      <Route path="/" element={user ? <DashboardPage /> : <Navigate to="/auth" replace />} />
      <Route path="/reports" element={user ? <ReportPage /> : <Navigate to="/auth" replace />} />
    </Routes>
  );
};

export default App;