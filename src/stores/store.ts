import { atom, selector } from "recoil";

export type ViewStateType = "monthly" | "weekly";

export const currentViewState = atom({
  key: "currentView",
  default: "monthly" as ViewStateType,
});
