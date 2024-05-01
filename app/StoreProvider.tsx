"use client";

import { AppStore, makeStore } from "@/lib/store";
import { ReactNode, useEffect, useMemo, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const store = useMemo(() => {
    return makeStore();
  }, []);

  console.log(store.getState());

  return <Provider store={store}>{children}</Provider>;
}
