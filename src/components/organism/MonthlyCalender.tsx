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
import { CalenderTable } from "../templates/CalenderTable";

interface HeaderType {
  weekday: number;
}

const DayHeaderTd = styled.td<HeaderType>`
  height: 2rem;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  vertical-align: top;
  &:last-child {
    border-right: 0;
  }
  color: ${(props) =>
    props.weekday == 0 ? "red" : props.weekday == 6 ? "blue" : "grey"};
`;

const MonthlyCalender = () => {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [scheduleInput, setScheduleInput] = useRecoilState(scheduleInputState);
  const [toggleScheduleInput, setToggleScheduleInput] = useRecoilState(
    toggleScheduleInputState
  );

  const calender = useRecoilValue(calenderValue);

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
      <CalenderTable>
        <thead>
          <tr>
            <DayHeaderTd weekday={0}>Sunday</DayHeaderTd>
            <DayHeaderTd weekday={1}>Monday</DayHeaderTd>
            <DayHeaderTd weekday={2}>Tuesday</DayHeaderTd>
            <DayHeaderTd weekday={3}>Wednesday</DayHeaderTd>
            <DayHeaderTd weekday={4}>Thursday</DayHeaderTd>
            <DayHeaderTd weekday={5}>Friday</DayHeaderTd>
            <DayHeaderTd weekday={6}>Saturday</DayHeaderTd>
          </tr>
        </thead>
        <tbody>{viewCalender}</tbody>
      </CalenderTable>
    </>
  );
};

export default MonthlyCalender;
