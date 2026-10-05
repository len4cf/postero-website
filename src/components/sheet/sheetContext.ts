import { createContext, useContext } from "react";

export type CloseIntent = "back" | "schedule";

export type SheetApi = {
  close: (intent?: CloseIntent) => void;
  scrollToId: (id: string) => void;
};

export const SheetContext = createContext<SheetApi | null>(null);

export function useSheetApi() {
  const api = useContext(SheetContext);
  if (!api) throw new Error("useSheetApi must be used inside <SheetPage>");
  return api;
}
