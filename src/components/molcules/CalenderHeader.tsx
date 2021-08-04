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
import CalenderHeaderText from "../atoms/CalenderHeaderText";

const Button = styled.button`
  font-size: 3rem;
  font-weight: 500;
`;

const CalenderHeader = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  console.log(currentDate);
  return (
    <>
      <TodayButton />
      <NextButton direction="left" />
      <CalenderHeaderText />
      <NextButton direction="right" />
      <ViewToggleButton />
    </>
  );
};

export default CalenderHeader;
