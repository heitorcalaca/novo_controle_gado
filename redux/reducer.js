import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: { modalEditaIsOpen: false, formId: undefined, deleteId: null },
};

export const reducerSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    modalOpenAction: (state) => {
      state.client.modalEditaIsOpen = !state.client.modalEditaIsOpen;
    },

    updateAction: (state, action) => {
      state.client.formId = action.payload;
    },

    deleteAction: (state, action) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const { modalOpenAction, updateAction, deleteAction } =
  reducerSlice.actions;
export default reducerSlice.reducer;
