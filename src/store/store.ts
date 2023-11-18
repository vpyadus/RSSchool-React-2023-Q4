import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/searchSlice/searchSlice';
import itemsPerPageReducer from '../features/itemsPerPageSlice/itemsPerPageSlice';
import loadingFlagsReducer from '../features/loadingFlagsSlice/loadingFlagsSlice';
import { beerAPI } from '../api/BeerAPI';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export const store: ToolkitStore = configureStore({
  reducer: {
    search: searchReducer,
    perPage: itemsPerPageReducer,
    [beerAPI.reducerPath]: beerAPI.reducer,
    loadingFlags: loadingFlagsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(beerAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
