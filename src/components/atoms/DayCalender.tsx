import { useRecoilState } from "recoil";
import styled from "styled-components";
import { formatDate } from "../../services/utils";
import {
  Schedule,
  scheduleInputState,
  scheduleListState,
  toggleScheduleInputState,
} from "../../stores/store";

const DayTd = styled.td`
  height: 5rem;
`;

const DaySchedule = styled.div`
  background: ${(props) => props.color};
  height: 1rem;
`;

const DayCalneder = (props: { day: Date }) => {
  const [scheduleInput, setScheduleInput] = useRecoilState(scheduleInputState);
  const [toggleScheduleInput, setToggleScheduleInput] = useRecoilState(
    toggleScheduleInputState
  );
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListState);

  const updateToggleSchedule = (inputDate: Date) => {
    const newSchedule: Schedule = {
      startDate: formatDate(inputDate),
      endDate: "",
    };
    setToggleScheduleInput(true);
    setScheduleInput(newSchedule);
  };

  const todaySchedule = scheduleList.filter((item) => {
    console.log(
      new Date(item.startDate),
      props.day,
      new Date(`${item.endDate} 23:59:59`)
    );
    if (
      new Date(`${item.startDate} 00:00:00`) <= props.day &&
      props.day <= new Date(`${item.endDate} 23:59:59`)
    ) {
      return true;
    }
    return false;
  });
  console.log(todaySchedule);

  const dayScheduleComponent = todaySchedule.map((item, index) => {
    return (
      <DaySchedule
        key={`${props.day.toLocaleString}-${index}`}
        color={item.color}
      >
        OOO
      </DaySchedule>
    );
  });

  return (
    <DayTd onClick={() => updateToggleSchedule(props.day)}>
      {props.day.getMonth() + 1}/{props.day.getDate()}
      {dayScheduleComponent}
    </DayTd>
  );
};

export default DayCalneder;
