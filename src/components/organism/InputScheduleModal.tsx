import { useRecoilState } from "recoil";
import {
  currentDateState,
  currentViewState,
  Schedule,
  scheduleInputState,
  scheduleListState,
  toggleScheduleInputState,
  ViewStateType,
} from "../../stores/store";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { getRandomColor, timeOptions } from "../../services/utils";

const Button = styled.button`
  font-size: 2rem;
`;

const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
`;

const Modal = styled.div`
  background-color: white;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  position: relative;
  padding: 20px;
  border-radius: 10px;
  z-index: 100;
`;

const InputHeader = styled.div`
  text-align: left;
  font-size: 1.5em;
  font-weight: 700;
`;

const InputRow = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const FunctionButton = styled.button`
  width: 6em;
  padding: 5px;
`;

const InputScheduleModal = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState(0);

  const [scheduleInput, setScheduleInput] = useRecoilState(scheduleInputState);
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListState);
  const [toggleScheduleInput, setToggleScheduleInput] = useRecoilState(
    toggleScheduleInputState
  );

  useEffect(() => {
    if (toggleScheduleInput.isModify) {
      setTitle(scheduleInput.title);
      setStartDate(scheduleInput.startDate);
      setStartTime(scheduleInput.startTime);
      setEndDate(scheduleInput.endDate);
      setEndTime(scheduleInput.endTime);
    }
  }, []);

  const insertSchedule = () => {
    if (!title) {
      alert("?????? ????????? ????????? ?????????!");
      return;
    }
    if (toggleScheduleInput.isModify) {
      scheduleList.forEach((item) => {
        if (item.id == scheduleInput.id) {
          item = {
            title,
            startDate,
            startTime,
            endDate,
            endTime,
          };
        }
        setScheduleList([...scheduleList]);
      });
    } else {
      const newSchedule: Schedule = {
        id: v4(),
        color: getRandomColor(),
        title,
        startDate,
        startTime,
        endDate,
        endTime,
      };
      setScheduleList([...scheduleList, newSchedule]);
    }
    setToggleScheduleInput({
      toggle: false,
      isModify: false,
    });
  };

  const deleteSchedule = () => {
    const result = confirm("?????? ????????? ?????????????????????????");
    if (result) {
      const currentIndex = scheduleList.findIndex(
        (el) => el.id === scheduleInput.id
      );
      setScheduleList([
        ...scheduleList.slice(0, currentIndex),
        ...scheduleList.slice(currentIndex + 1),
      ]);
      setToggleScheduleInput({
        toggle: false,
        isModify: false,
      });
    }
  };

  const OptionListComponent = timeOptions().map((item: any, index) => {
    return (
      <option key={`option-${index}`} value={item.value}>
        {item.text}
      </option>
    );
  });
  return (
    <>
      <ModalWrapper>
        <Modal>
          <InputHeader>
            {toggleScheduleInput.isModify ? "?????? ????????????" : "?????? ?????????"}
          </InputHeader>
          <CloseButton
            onClick={() => {
              setToggleScheduleInput({
                toggle: false,
                isModify: false,
              });
            }}
          >
            X
          </CloseButton>
          <InputRow>
            ?????? ????????? ???????????????
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </InputRow>
          <InputRow>
            ?????? ??????
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
            ?????? ??????
            <select
              name="startTime"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(parseInt(e.target.value))}
            >
              {OptionListComponent}
            </select>
          </InputRow>
          <InputRow>
            ?????? ??????
            <input
              name="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
            ?????? ??????
            <select
              name="endTime"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(parseInt(e.target.value))}
            >
              {OptionListComponent}
            </select>
          </InputRow>
          <FunctionButton
            onClick={() =>
              setToggleScheduleInput({
                toggle: false,
                isModify: false,
              })
            }
          >
            ??????
          </FunctionButton>
          {toggleScheduleInput.isModify ? (
            <FunctionButton onClick={() => deleteSchedule()}>
              ??????
            </FunctionButton>
          ) : (
            ""
          )}
          <FunctionButton onClick={() => insertSchedule()} type="submit">
            ??????
          </FunctionButton>
        </Modal>
      </ModalWrapper>
    </>
  );
};

export default InputScheduleModal;
