import { useRecoilValue } from "recoil";
import { calenderValue } from "../../stores/store";
import CalenderHeader from "../molcules/CalenderHeader";
import WeeklyCalender from "../organism/WeeklyCalender";

const WeeklyCalaenderPage = () => {
  const info = useRecoilValue(calenderValue);

  return (
    <>
      <CalenderHeader />
      <WeeklyCalender />
    </>
  );
};

export default WeeklyCalaenderPage;
