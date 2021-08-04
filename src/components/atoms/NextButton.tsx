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

const Button = styled.span`
  font-size: 2rem;
  color: grey;
  cursor: pointer;
`;

const NextButton = (props: NextButtonProps) => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [currentView] = useRecoilState(currentViewState);

  const updateCurrentDate = () => {
    let addDirection = 1;
    if (props.direction == "left") {
      addDirection = -1;
    }

    if (currentView == "monthly") {
      const nextMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + addDirection,
        1
      );
      setCurrentDate(nextMonth);
    } else if (currentView == "weekly") {
      const nextWeek = new Date(
        currentDate.getTime() + addDirection * 7 * 24 * 60 * 60 * 1000
      );
      setCurrentDate(nextWeek);
    }
  };

  return (
    <>
      <Button onClick={() => updateCurrentDate()}>
        {props.direction == "left" ? "<" : ">"}
      </Button>
    </>
  );
};

export default NextButton;
