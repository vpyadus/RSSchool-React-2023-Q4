import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export interface FormData {
  formType: 'uncontrolled' | 'controlled';
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female';
  tcAccepted: boolean;
  picture: string;
  country: string;
}

export interface FormDataSliceState {
  formSubmissions: Array<FormData>;
}

const initialState: FormDataSliceState = {
  formSubmissions: [] as Array<FormData>,
};

export const formDataSlice: Slice<FormDataSliceState> = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormData: (
      state: FormDataSliceState,
      action: PayloadAction<FormData>
    ) => {
      state.formSubmissions.push(action.payload);
    },
  },
});

export const { addFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
