import { useRecoilState } from "recoil";
import { currentViewState, ViewStateType } from "../../stores/store";

const MonthlyCalender = () => {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const toggleView = (viewValue: ViewStateType) => {
    setCurrentView(viewValue);
  };

  return <>MonthlCalender</>;
};

export default MonthlyCalender;
