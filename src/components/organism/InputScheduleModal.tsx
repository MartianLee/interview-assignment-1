import { useRecoilState } from "recoil";
import {
  currentDateState,
  currentViewState,
  Schedule,
  scheduleInputState,
  scheduleListState,
  ViewStateType,
} from "../../stores/store";
import styled, { css } from "styled-components";
import { useState } from "react";
import { v4 } from "uuid";

const Button = styled.button`
  font-size: 2rem;
`;

const InputScheduleModal = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState(0);

  const [scheduleInput, setScheduleInput] = useRecoilState(scheduleInputState);
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListState);
  const updateCurrentDate = () => {
    setScheduleInput({
      startDate: "",
    });
  };

  const insertSchedule = () => {
    console.log(title, startDate, startTime, endDate, endTime);
    const newSchedule: Schedule = {
      title,
      startDate,
      startTime,
      endDate,
      endTime,
    };
    setScheduleList([...scheduleList, newSchedule]);
  };

  const myFunction = (event: any) => {
    console.log(event.target.value);
    // schedule.startDate = new Date(event.target.value);
  };

  //   handleChange(event) {
  //     this.setState({value: event.target.value});
  //   }

  return (
    <>
      <div>
        {scheduleList.map((schedule, index) => {
          return (
            <div key={`schedule-${index}`}>
              {schedule.startDate} {schedule.startTime} &nbsp;
              {schedule.endDate} {schedule.endTime}
            </div>
          );
        })}
      </div>
      <div>
        날짜 입력입력
        {scheduleInput.startDate}
        {/* <input type="date" onChange={() => myFunction(event)}></input> */}
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
        <select
          name="startTime"
          id="startTime"
          onChange={(e) => setStartTime(parseInt(e.target.value))}
        >
          <option value="0">AM 01:00</option>
          <option value="1">AM 01:30</option>
          <option value="2">AM 02:00</option>
        </select>
        <input
          name="endDate"
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
        ></input>
        <select
          name="endTime"
          id="endTime"
          onChange={(e) => setEndTime(parseInt(e.target.value))}
        >
          <option value="0">AM 01:00</option>
          <option value="1">AM 01:30</option>
          <option value="2">AM 02:00</option>
        </select>
        <button>취소</button>
        <input onClick={() => insertSchedule()} type="submit" value="저장" />
      </div>
    </>
  );
};

export default InputScheduleModal;
