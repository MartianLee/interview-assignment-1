import { useRecoilState, useRecoilValue } from "recoil";
import {
  calenderValue,
  currentViewState,
  Schedule,
  scheduleInputState,
  toggleScheduleInputState,
  ViewStateType,
} from "../../stores/store";
import { v4 } from "uuid";
import styled from "styled-components";
import { formatDate } from "../../services/utils";
import DayCalneder from "../atoms/DayCalender";

const MonthlyCalender = () => {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [scheduleInput, setScheduleInput] = useRecoilState(scheduleInputState);
  const [toggleScheduleInput, setToggleScheduleInput] = useRecoilState(
    toggleScheduleInputState
  );

  const calender = useRecoilValue(calenderValue);
  const toggleView = (viewValue: ViewStateType) => {
    setCurrentView(viewValue);
  };

  const updateToggleSchedule = (inputDate: Date) => {
    const newSchedule: Schedule = {
      startDate: formatDate(inputDate),
      endDate: "",
    };
    setToggleScheduleInput(true);
    setScheduleInput(newSchedule);
  };

  const WeekCalender = (week: Date[]) => {
    return (
      <tr key={v4()}>
        {week.map((day: Date) => {
          return <DayCalneder key={v4()} day={day} />;
        })}
      </tr>
    );
  };

  const viewCalender = Array.from(
    { length: Math.ceil(calender.length / 7) },
    (v, i) => calender.slice(i * 7, i * 7 + 7)
  ).map((week) => {
    return WeekCalender(week);
  });
  console.log(viewCalender);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Sunday</td>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
            <td>Saturday</td>
          </tr>
        </thead>
        <tbody>{viewCalender}</tbody>
      </table>
    </>
  );
};

export default MonthlyCalender;
