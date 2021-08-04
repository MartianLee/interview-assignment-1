import { useRecoilState, useRecoilValue } from "recoil";
import {
  calenderValue,
  currentViewState,
  Schedule,
  scheduleInputState,
  scheduleListState,
  toggleScheduleInputState,
  ViewStateType,
} from "../../stores/store";
import { v4 } from "uuid";
import styled from "styled-components";
import { formatDate, timeOptions, TimeType } from "../../services/utils";
import DayCalneder from "../atoms/DayCalender";

type ScheduleElementType = {
  day?: number;
  time?: number;
  length?: number;
  color?: string;
};

type DatyTdType = {
  isThirties?: boolean;
  isLast?: boolean;
};

const CalenderTable = styled.table`
  table-layout: fixed;
  width: 100%;
  padding: 30px;
  border-spacing: 0;
`;

const DayTd = styled.td<DatyTdType>`
  height: 36px;
  border-right: 1px solid #ddd;
  border-bottom: ${(props) =>
    props.isLast || props.isThirties ? "" : "1px solid #ddd"};
  vertical-align: top;
  &:last-child {
    border-right: 0;
  }
`;

const ScheduleElement = styled.div<ScheduleElementType>`
  position: absolute;
  left: calc(30px + calc(calc(100% - 60px) / 8 * ${(props) => props.day}));
  top: calc(28px + calc(calc(36px + 3px) * ${(props) => props.time}));
  width: calc(calc(100% - 60px) / 8 - 16px);
  height: calc(calc(36px + 3px) * ${(props) => props.length} - 16px);
  margin: 8px;
  background: ${(props) => props.color};
  color: white;
  font-size: 12px;
`;

const ScheduleWrapper = styled.div`
  position: relative;
`;

const WeeklyCalender = () => {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [scheduleInput, setScheduleInput] = useRecoilState(scheduleInputState);
  const [toggleScheduleInput, setToggleScheduleInput] = useRecoilState(
    toggleScheduleInputState
  );

  const updateToggleSchedule = (inputDate: Date) => {
    const newSchedule: Schedule = {
      startDate: formatDate(inputDate),
      endDate: "",
      startTime: 0,
      endTime: 0,
    };
    setToggleScheduleInput(true);
    setScheduleInput(newSchedule);
  };

  const updateSchedule = (schedule: Schedule) => {
    setToggleScheduleInput(true);
    setScheduleInput(schedule);
  };

  const [scheduleList, setScheduleList] = useRecoilState(scheduleListState);
  const calender = useRecoilValue(calenderValue);

  const viewWeekdayCalender = (time: TimeType) => {
    const week = [];
    week.push(
      <DayTd
        key={v4()}
        isLast={time.value == "47"}
        isThirties={parseInt(time.value) % 2 == 0}
      >
        {parseInt(time.value) % 2 == 0 ? time.korean : ""}
      </DayTd>
    );
    for (
      let iter = new Date(calender[0]);
      iter <= new Date(calender[6]);
      iter.setDate(iter.getDate() + 1)
    ) {
      week.push(
        <DayTd
          key={v4()}
          isLast={time.value == "47"}
          isThirties={parseInt(time.value) % 2 == 0}
          onClick={() => updateToggleSchedule(iter)}
        ></DayTd>
      );
    }
    return week;
  };
  const viewCalender = timeOptions().map((time) => {
    return <tr key={v4()}>{viewWeekdayCalender(time)}</tr>;
  });
  /*
    이번 일주일
  */

  const ScheduleElmentList = () => {
    const elementList: JSX.Element[] = [];
    const timeOptionList = timeOptions();
    scheduleList.forEach((schedule) => {
      if (
        calender[0] <= new Date(schedule.startDate) &&
        new Date(schedule.startDate) <= calender[6]
      ) {
        console.log(schedule);
        for (
          let iter = new Date(schedule.startDate);
          iter <= new Date(schedule.endDate);
          iter.setDate(iter.getDate() + 1)
        ) {
          let time;
          if (iter.getDate() == new Date(schedule.startDate).getDate()) {
            time = schedule.startTime;
          } else {
            time = 0;
          }
          if (schedule.startDate == schedule.endDate) {
            length = schedule.endTime - schedule.startTime;
          } else if (iter.getDay() == new Date(schedule.endDate).getDay()) {
            length = schedule.endTime;
          } else {
            length = 48;
          }
          elementList.push(
            <ScheduleElement
              key={v4()}
              day={new Date(schedule.startDate).getDay() + 1}
              time={time + 1}
              length={length + 1}
              color={schedule.color}
              onClick={() => () => updateToggleSchedule(iter)}
            >
              <div>
                {timeOptionList[schedule.startTime].text}-
                {timeOptionList[schedule.endTime].text}
              </div>
              <div>{schedule.title}</div>
            </ScheduleElement>
          );
        }
      }
    });
    return elementList;
  };

  return (
    <>
      <ScheduleWrapper>{ScheduleElmentList()}</ScheduleWrapper>
      {/* <CalenderPresetation>
        
      </CalenderPresetation> */}
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
