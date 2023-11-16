import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/searchSlice/searchSlice';
import itemsPerPageReducer from '../features/itemsPerPageSlice/itemsPerPageSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    perPage: itemsPerPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
