import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: { toggleForm: false, formId: undefined },
};

export const reducerSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },

    updateAction: (state, action) => {
      state.client.formId = action.payload;
    },
  },
});

export const { toggleChangeAction, updateAction } = reducerSlice.actions;
export default reducerSlice.reducer;
