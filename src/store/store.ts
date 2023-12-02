import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from '../features/formDataSlice/formDataSlice';
import countriesReducer from '../features/countriesSlice/countriesSlice';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export const store: ToolkitStore = configureStore({
  reducer: {
    formData: formDataReducer,
    countries: countriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
