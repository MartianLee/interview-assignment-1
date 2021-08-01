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
        console.log(itDate, count);
      }
      count = 0;
      lastDay.setDate(lastDay.getDate() + 1);
      while (count < 2) {
        if (lastDay.getDay() == 6) {
          count++;
          if (count == 2) break;
        }
        lastDay.setDate(lastDay.getDate() + 1);
        console.log(lastDay, count);
      }
    } else {
      // currentDate가 속한 이번 주
      firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      console.log(firstDay, lastDay);
    }
    const itDate = new Date(firstDay);
    while (itDate <= lastDay) {
      calender.push(new Date(itDate));
      itDate.setDate(itDate.getDate() + 1);
    }
    return calender;
  },
});
