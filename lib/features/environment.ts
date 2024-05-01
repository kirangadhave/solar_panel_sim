import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Environment = {
  ambientTemp: number;
  irradiance: number;
};

export const environmentSlice = createSlice({
  name: "environment",
  initialState: {
    ambientTemp: 25,
    irradiance: 4.9 * 1000,
  } as Environment,
  reducers: {
    setAmbientTemperature: (
      state,
      action: PayloadAction<Environment["ambientTemp"]>
    ) => {
      state.ambientTemp = action.payload;
    },
    setIrradiance: (
      state,
      action: PayloadAction<Environment["irradiance"]>
    ) => {
      state.irradiance = action.payload;
    },
  },
});

export const { setAmbientTemperature, setIrradiance } =
  environmentSlice.actions;

export default environmentSlice.reducer;
