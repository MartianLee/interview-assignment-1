import { useRecoilValue } from "recoil";
import { calenderValue } from "../../stores/store";
import CalenderHeader from "../molcules/CalenderHeader";
import MonthlyCalender from "../organism/MonthlyCalender";

const MonthlyCalenderPage = () => {
  const info = useRecoilValue(calenderValue);
  console.log(info);

  return (
    <>
      <CalenderHeader />
      <MonthlyCalender />
    </>
  );
};

export default MonthlyCalenderPage;
