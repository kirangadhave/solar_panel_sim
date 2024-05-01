import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SolarPanel = {
  eff: number;
  area: number;
  currentOutput: number;
};

export const solarPanelSlice = createSlice({
  name: "solarPanel",
  initialState: {
    eff: 0.5,
    area: 2,
    currentOutput: 0,
  } as SolarPanel,
  reducers: {
    setEfficiency: (state, action: PayloadAction<SolarPanel["eff"]>) => {
      state.eff = action.payload;
    },
    setArea: (state, action: PayloadAction<SolarPanel["area"]>) => {
      state.area = action.payload;
    },
    setCurrentOutput: (
      state,
      action: PayloadAction<SolarPanel["currentOutput"]>
    ) => {
      state.currentOutput = action.payload;
    },
  },
});

export const { setCurrentOutput, setEfficiency, setArea } =
  solarPanelSlice.actions;

export default solarPanelSlice.reducer;
