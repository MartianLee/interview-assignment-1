import { useRecoilState, useRecoilValue } from "recoil";
import {
  calenderValue,
  currentDateState,
  currentViewState,
  Schedule,
  scheduleInputState,
  scheduleListState,
  toggleScheduleInputState,
  ViewStateType,
} from "../../stores/store";
import { v4 } from "uuid";
import styled from "styled-components";
import {
  formatDate,
  isToday,
  timeOptions,
  TimeType,
} from "../../services/utils";
import DayCalneder from "../atoms/DayCalender";
import { CalenderTable } from "../templates/CalenderTable";
import { Today } from "../atoms/Today";
import { NormalDay } from "../atoms/NormalDay";

type ScheduleElementType = {
  day?: number;
  time?: number;
  length?: number;
  color?: string;
};

type DatyTdType = {
  isThirties?: boolean;
  isLast?: boolean;
  weekday?: number;
};

const DayTd = styled.td<DatyTdType>`
  height: 36px;
  border-right: 1px solid #ddd;
  border-bottom: ${(props) =>
    props.isLast || props.isThirties ? "" : "1px solid #ddd"};
  vertical-align: top;
  &:last-child {
    border-right: 0;
  }
  color: ${(props) =>
    props.weekday == 0 ? "red" : props.weekday == 6 ? "blue" : "grey"};
`;

const ScheduleElement = styled.div<ScheduleElementType>`
  position: absolute;
  left: calc(30px + calc(calc(100% - 60px) / 8 * ${(props) => props.day}));
  top: calc(48px + calc(calc(36px + 3px) * ${(props) => props.time}));
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
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [scheduleInput, setScheduleInput] = useRecoilState(scheduleInputState);
  const [toggleScheduleInput, setToggleScheduleInput] = useRecoilState(
    toggleScheduleInputState
  );

  const updateToggleSchedule = (inputDate: Date) => {
    const newSchedule: Schedule = {
      title: "",
      startDate: formatDate(inputDate),
      endDate: "",
      startTime: 0,
      endTime: 0,
    };
    setScheduleInput(newSchedule);
    setToggleScheduleInput({
      toggle: true,
      isModify: false,
    });
  };

  const updateSchedule = (schedule: Schedule) => {
    setToggleScheduleInput({
      toggle: true,
      isModify: true,
    });
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
        (calender[0] <= new Date(schedule.startDate) &&
          new Date(schedule.startDate) <= calender[6]) ||
        (calender[0] <= new Date(schedule.endDate) &&
          new Date(schedule.startDate) <= calender[6])
      ) {
        console.log(schedule);
        for (
          let iter = new Date(schedule.startDate);
          iter <= new Date(schedule.endDate);
          iter.setDate(iter.getDate() + 1)
        ) {
          if (iter <= calender[0]) continue;
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
              length={length}
              color={schedule.color}
              onClick={() => updateSchedule(schedule)}
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
  console.log(calender);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const headTd = calender.map((weekday) => {
    console.log(weekday);
    return (
      <DayTd key={v4()} weekday={weekday.getDay()}>
        <div>{days[weekday.getDay()]}</div>
        {isToday(weekday) ? (
          <Today alignText="center">{weekday.getDate()}</Today>
        ) : (
          <NormalDay
            thisMonth={weekday.getMonth() === currentDate.getMonth()}
            alignText="center"
          >
            {weekday.getDate()}
          </NormalDay>
        )}
      </DayTd>
    );
  });

  return (
    <>
      <ScheduleWrapper>{ScheduleElmentList()}</ScheduleWrapper>

      <CalenderTable>
        <thead>
          <tr>
            <DayTd></DayTd>
            {headTd}
          </tr>
        </thead>
        <tbody>{viewCalender}</tbody>
      </CalenderTable>
    </>
  );
};

export default WeeklyCalender;
