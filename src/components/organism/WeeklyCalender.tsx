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
import { formatDate, timeOptions, TimeType } from "../../services/utils";
import DayCalneder from "../atoms/DayCalender";
import { isTypeReferenceNode } from "typescript";

const CalenderTable = styled.table`
  table-layout: fixed;
  width: 100%;
  padding: 30px;
`;

const DayTd = styled.td`
  height: 4em;
`;

const WeeklyCalender = () => {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [scheduleInput, setScheduleInput] = useRecoilState(scheduleInputState);
  const [toggleScheduleInput, setToggleScheduleInput] = useRecoilState(
    toggleScheduleInputState
  );
  const calender = useRecoilValue(calenderValue);

  const viewWeekdayCalender = (time: TimeType) => {
    const week = [];
    week.push(<DayTd key={v4()}>{time.korean}</DayTd>);
    for (
      let iter = new Date(calender[0]);
      iter <= new Date(calender[6]);
      iter.setDate(iter.getDate() + 1)
    ) {
      week.push(<td key={v4()}>{iter.getDate()}</td>);
    }
    return week;
  };
  const viewCalender = timeOptions().map((time) => {
    return <tr key={v4()}>{viewWeekdayCalender(time)}</tr>;
  });

  return (
    <>
      <CalenderTable>
        <thead>
          <tr>
            <DayTd></DayTd>
            <DayTd>
              Sunday <br />
              {calender[0].getDate()}
            </DayTd>
            <DayTd>
              Monday <br />
              {calender[1].getDate()}
            </DayTd>
            <DayTd>
              Tuesday <br />
              {calender[2].getDate()}
            </DayTd>
            <DayTd>
              Wednesday <br />
              {calender[3].getDate()}
            </DayTd>
            <DayTd>
              Thursday <br />
              {calender[4].getDate()}
            </DayTd>
            <DayTd>
              Friday <br />
              {calender[5].getDate()}
            </DayTd>
            <DayTd>
              Saturday <br />
              {calender[6].getDate()}
            </DayTd>
          </tr>
        </thead>
        <tbody>{viewCalender}</tbody>
      </CalenderTable>
    </>
  );
};

export default WeeklyCalender;
