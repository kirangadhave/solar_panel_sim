import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type StorageTank = {
  temp: number;
  volume: number;
};

export const storageTankSlice = createSlice({
  name: "storageTank",
  initialState: {
    temp: 26,
    volume: 0.15,
    heatAbsorbed: 0,
  } as StorageTank,
  reducers: {
    setTemperature: (state, action: PayloadAction<StorageTank["temp"]>) => {
      state.temp = action.payload;
    },
    setVolume: (state, action: PayloadAction<StorageTank["volume"]>) => {
      state.volume = action.payload;
    },
  },
});

export const { setTemperature, setVolume } = storageTankSlice.actions;

export default storageTankSlice.reducer;
