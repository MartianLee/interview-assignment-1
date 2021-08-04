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

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`;

const CenterElement = styled.div`
  flex: 1;
`;

const CalenderHeader = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  console.log(currentDate);
  return (
    <>
      <HeaderElement>
        <TodayButton />
        <CenterElement>
          <NextButton direction="left" />
          <CalenderHeaderText />
          <NextButton direction="right" />
        </CenterElement>
        <ViewToggleButton />
      </HeaderElement>
    </>
  );
};

export default CalenderHeader;
