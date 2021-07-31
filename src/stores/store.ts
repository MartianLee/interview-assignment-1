import { atom, selector } from "recoil";

export type ViewStateType = "monthly" | "weekly";

export const currentViewState = atom({
  key: "currentView",
  default: "monthly" as ViewStateType,
});

export const currentDateState = atom({
  key: "currentDate",
  default: new Date(),
});

export const calenderValue = selector({
  key: "calenderValue",
  get: ({ get }) => {
    const viewState = get(currentViewState);
    const currentDate = get(currentDateState);
    if (viewState == "monthly") {
      return ["1", "2"];
    } else {
      return ["3", "4"];
    }
  },
});
