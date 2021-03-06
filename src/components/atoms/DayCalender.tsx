import { useRecoilState } from "recoil";
import styled from "styled-components";
import { formatDate, isToday } from "../../services/utils";
import {
  currentDateState,
  Schedule,
  scheduleInputState,
  scheduleListState,
  toggleScheduleInputState,
} from "../../stores/store";
import { NormalDay } from "./NormalDay";
import { Today } from "./Today";

const DayTd = styled.td`
  height: 6rem;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  vertical-align: top;
  &:last-child {
    border-right: 0;
  }
  padding: 10px;
`;

const DaySchedule = styled.div`
  font-size: 13px;
  background: ${(props) => props.color};
  height: 1rem;
  color: white;
  border-radius: 4px;
  padding: 2px;
  margin-bottom: 4px;
  text-align: left;
  padding-left: 6px;
`;

const DayCalneder = (props: { day: Date }) => {
  const [scheduleInput, setScheduleInput] = useRecoilState(scheduleInputState);
  const [toggleScheduleInput, setToggleScheduleInput] = useRecoilState(
    toggleScheduleInputState
  );
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListState);

  const updateToggleSchedule = (inputDate: Date) => {
    const newSchedule: Schedule = {
      title: "",
      startDate: formatDate(inputDate),
      endDate: "",
      startTime: 0,
      endTime: 0,
    };
    setToggleScheduleInput({
      toggle: true,
      isModify: false,
    });
    setScheduleInput(newSchedule);
  };

  const updateSchedule = (schedule: Schedule) => {
    setToggleScheduleInput({
      toggle: true,
      isModify: true,
    });
    setScheduleInput(schedule);
  };

  const todaySchedule = scheduleList.filter((item) => {
    if (
      new Date(`${item.startDate} 00:00:00`) <= props.day &&
      props.day <= new Date(`${item.endDate} 23:59:59`)
    ) {
      return true;
    }
    return false;
  });

  const dayScheduleComponent = todaySchedule.map((item, index) => {
    return (
      <DaySchedule
        key={`${props.day.toLocaleString}-${index}`}
        color={item.color}
        onClick={() => updateSchedule(item)}
      >
        {item.title}
      </DaySchedule>
    );
  });
  const DateText = props.day.getDate();

  return (
    <DayTd onClick={() => updateToggleSchedule(props.day)}>
      {isToday(props.day) ? (
        <Today>{DateText}</Today>
      ) : (
        <NormalDay
          thisMonth={props.day.getMonth() === currentDate.getMonth()}
          alignText="left"
        >
          {DateText}
        </NormalDay>
      )}
      {dayScheduleComponent}
    </DayTd>
  );
};

export default DayCalneder;
