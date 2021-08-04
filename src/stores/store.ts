import { atom, selector } from "recoil";

export type ViewStateType = "monthly" | "weekly";
export interface Schedule {
  id?: string;
  color?: string;
  title: string;
  startDate: string;
  startTime: number;
  endDate: string;
  endTime: number;
}

export interface ToggleType {
  toggle: boolean;
  isModify?: boolean;
}

export const currentViewState = atom({
  key: "currentView",
  default: "monthly" as ViewStateType,
});

export const currentDateState = atom({
  key: "currentDate",
  default: new Date(),
});

export const toggleScheduleInputState = atom({
  key: "toggleScheduleInput",
  default: {
    toggle: false,
    isModify: false,
  } as ToggleType,
});

export const scheduleInputState = atom({
  key: "scheduleInput",
  default: {} as Schedule,
});

export const scheduleListState = atom({
  key: "scheduleList",
  default: [] as Schedule[],
});

export const calenderValue = selector({
  key: "calenderValue",
  get: ({ get }) => {
    const calender: Date[] = [];
    const viewState = get(currentViewState);
    const currentDate = get(currentDateState);
    let firstDay, lastDay;
    if (viewState == "monthly") {
      // 지난 달의 마지막주 부터
      // 다음 달의 첫째주 까지 총 6주를 generate
      firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      const lastMonth = [];
      let count = 0;
      const itDate = firstDay;
      while (count < 1) {
        if (itDate.getDay() == 0) {
          count++;
          break;
        }
        itDate.setDate(itDate.getDate() - 1);
      }
      count = 0;
      lastDay.setDate(lastDay.getDate() + 1);
      while (count < 2) {
        if (lastDay.getDay() == 6) {
          count++;
          if (count == 2) break;
        }
        lastDay.setDate(lastDay.getDate() + 1);
      }
    } else {
      // currentDate가 속한 이번 주
      // currentDate.getDate() - currentDate.getDay()
      firstDay = new Date(
        new Date(currentDate).setDate(
          currentDate.getDate() - currentDate.getDay()
        )
      );
      firstDay.setHours(0, 0, 0);
      lastDay = new Date(
        new Date(currentDate).setDate(
          currentDate.getDate() + (6 - currentDate.getDay())
        )
      );
      lastDay.setHours(23, 59, 59);
    }
    const itDate = new Date(firstDay);
    while (itDate <= lastDay) {
      calender.push(new Date(itDate));
      itDate.setDate(itDate.getDate() + 1);
    }
    return calender;
  },
});
