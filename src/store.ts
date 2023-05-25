import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { preferredRace: "" },
};

const raceSlice = createSlice({
  name: "race",
  initialState,
  reducers: {
    getRace: (state, action) => {
      state.value = action.payload;
    },
    letGoOfRace: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { getRace, letGoOfRace } = raceSlice.actions;

export const store = configureStore({
  reducer: {
    race: raceSlice.reducer,
  },
});
