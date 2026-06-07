import { useDispatch } from 'react-redux';
import { supabase } from '../services/supabaseClient';
import { setUser, setLoading, setError, clearAuth } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  const register = async (email: string, password: string, username: string) => {
    dispatch(setLoading(true));
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      dispatch(setError(error.message));
      return { success: false, error: error.message };
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, username, full_name: username }]);

      if (profileError) {
        dispatch(setError(profileError.message));
        return { success: false, error: profileError.message };
      }
    }

    dispatch(setUser(data.user));
    return { success: true };
  };

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      dispatch(setError(error.message));
      return { success: false, error: error.message };
    }

    dispatch(setUser(data.user));
    return { success: true };
  };

  const logout = async () => {
    dispatch(setLoading(true));
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      dispatch(setError(error.message));
      return { success: false, error: error.message };
    }

    dispatch(clearAuth());
    return { success: true };
  };

  return { register, login, logout };
};