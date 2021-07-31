import { useRecoilValue } from "recoil";
import { calenderValue } from "../../stores/store";
import CalenderHeader from "../molcules/CalenderHeader";

const MonthlyCalenderPage = () => {
  const info = useRecoilValue(calenderValue);
  console.log(info);

  return (
    <>
      <CalenderHeader />
    </>
  );
};

export default MonthlyCalenderPage;
