import { useRecoilState } from "recoil";
import {
  currentDateState,
  currentViewState,
  ViewStateType,
} from "../../stores/store";
import styled, { css } from "styled-components";
import ViewToggleButton from "../atoms/ViewToggleButton";
import TodayButton from "../atoms/TodayButton";
import NextButton from "../atoms/NextButton";

const Button = styled.button`
  font-size: 3rem;
  font-weight: 500;
`;

const CalenderHeader = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  console.log(currentDate);
  return (
    <>
      <TodayButton />
      <NextButton direction="left" />
      {currentDate.toLocaleString()}
      <NextButton direction="right" />
      <ViewToggleButton />
    </>
  );
};

export default CalenderHeader;
