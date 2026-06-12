import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabaseClient';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "expense" | "income";
  user_id: string;
}

interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (userId: string, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId);

    if (error) return rejectWithValue(error.message);
    return data as Transaction[];
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transaction: Omit<Transaction, 'id'>, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single();

    if (error) return rejectWithValue(error.message);
    return data as Transaction;
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id: string, { rejectWithValue }) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) return rejectWithValue(error.message);
    return id;
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default transactionsSlice.reducer;