import { useRecoilState } from "recoil";
import {
  currentDateState,
  currentViewState,
  ViewStateType,
} from "../../stores/store";
import styled, { css } from "styled-components";

const Button = styled.button`
  font-size: 2rem;
`;

const TodayButton = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const updateCurrentDate = () => {
    setCurrentDate(new Date());
  };

  return (
    <>
      <Button onClick={() => updateCurrentDate()}>오늘</Button>
    </>
  );
};

export default TodayButton;
