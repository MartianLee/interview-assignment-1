import { useRecoilState } from "recoil";
import {
  currentDateState,
  currentViewState,
  ViewStateType,
} from "../../stores/store";
import styled, { css } from "styled-components";

interface NextButtonProps {
  direction: string;
}

const Text = styled.span`
  font-size: 2rem;
  font-weight: 500;
  margin-left: 30px;
  margin-right: 30px;
`;

const CalenderHeaderText = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [currentView] = useRecoilState(currentViewState);

  return (
    <>
      <Text>
        {currentView === "monthly"
          ? `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`
          : `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}
      </Text>
    </>
  );
};

export default CalenderHeaderText;
