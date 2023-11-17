import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

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
});

export const { setIsLoadingMainPageFlag, setIsLoadingDetailsPageFlag } =
  loadingFlagsSlice.actions;
export default loadingFlagsSlice.reducer;
