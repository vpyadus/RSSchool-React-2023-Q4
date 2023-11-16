import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/searchSlice/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});
