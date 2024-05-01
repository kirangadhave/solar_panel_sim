import { configureStore } from "@reduxjs/toolkit";
import solarPanel from "./features/solar-panel";
import storageTank from "./features/storage-tank";
import environment from "./features/environment";

export function makeStore() {
  return configureStore({
    reducer: {
      solarPanel,
      storageTank,
      environment,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
