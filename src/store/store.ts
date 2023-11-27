import { configureStore } from '@reduxjs/toolkit';
import { beerAPI } from '../api/BeerAPI';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer: {
      [beerAPI.reducerPath]: beerAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(beerAPI.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type StoreState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
