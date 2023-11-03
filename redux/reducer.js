import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: { toggleForm: false, formId: undefined, deleteId: null },
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

    deleteAction: (state, action) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const { toggleChangeAction, updateAction, deleteAction } =
  reducerSlice.actions;
export default reducerSlice.reducer;
