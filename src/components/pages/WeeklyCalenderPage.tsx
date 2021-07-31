import { useRecoilValue } from "recoil";
import { calenderValue } from "../../stores/store";
import CalenderHeader from "../molcules/CalenderHeader";

const WeeklyCalaenderPage = () => {
  const info = useRecoilValue(calenderValue);

  return (
    <>
      <CalenderHeader />
    </>
  );
};

export default WeeklyCalaenderPage;
