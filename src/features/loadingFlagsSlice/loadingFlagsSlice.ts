import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { beerAPI } from '../../api/BeerAPI';

export interface LoadingFlagSliceState {
  isLoadingMainPage: boolean;
  isLoadingDetailsPage: boolean;
}

const initialState: LoadingFlagSliceState = {
  isLoadingMainPage: false,
  isLoadingDetailsPage: false,
};

export const loadingFlagsSlice: Slice<LoadingFlagSliceState> = createSlice({
  name: 'loadingFlags',
  initialState,
  reducers: {
    setIsLoadingMainPageFlag: (
      state: LoadingFlagSliceState,
      actions: PayloadAction<boolean>
    ) => {
      state.isLoadingMainPage = actions.payload;
    },
    setIsLoadingDetailsPageFlag: (
      state: LoadingFlagSliceState,
      actions: PayloadAction<boolean>
    ) => {
      state.isLoadingDetailsPage = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      beerAPI.endpoints.fetchData.matchPending,
      (state: LoadingFlagSliceState) => {
        state.isLoadingMainPage = true;
      }
    );
    builder.addMatcher(
      beerAPI.endpoints.fetchData.matchFulfilled,
      (state: LoadingFlagSliceState) => {
        state.isLoadingMainPage = false;
      }
    );
    builder.addMatcher(
      beerAPI.endpoints.fetchItem.matchPending,
      (state: LoadingFlagSliceState) => {
        state.isLoadingDetailsPage = true;
      }
    );
    builder.addMatcher(
      beerAPI.endpoints.fetchItem.matchFulfilled,
      (state: LoadingFlagSliceState) => {
        state.isLoadingDetailsPage = false;
      }
    );
  },
});

export const { setIsLoadingMainPageFlag, setIsLoadingDetailsPageFlag } =
  loadingFlagsSlice.actions;
export default loadingFlagsSlice.reducer;
