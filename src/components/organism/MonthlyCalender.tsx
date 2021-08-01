import { useRecoilState, useRecoilValue } from "recoil";
import {
  calenderValue,
  currentViewState,
  ViewStateType,
} from "../../stores/store";
import { v4 } from "uuid";

const DayCalneder = (props: { day: Date }) => {
  return (
    <td>
      {props.day.getMonth() + 1}/{props.day.getDate()}
    </td>
  );
};

const WeekCalender = (week: Date[]) => {
  return (
    <tr key={v4()}>
      {week.map((day: Date) => {
        return <DayCalneder key={v4()} day={day} />;
      })}
    </tr>
  );
};

const MonthlyCalender = () => {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const calender = useRecoilValue(calenderValue);
  const toggleView = (viewValue: ViewStateType) => {
    setCurrentView(viewValue);
  };

  const viewCalender = Array.from(
    { length: Math.ceil(calender.length / 7) },
    (v, i) => calender.slice(i * 7, i * 7 + 7)
  ).map((week) => {
    return WeekCalender(week);
  });
  console.log(viewCalender);

  return (
    <>
      MonthlCalender
      <table>
        <thead>
          <tr>
            <td>Sunday</td>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
            <td>Saturday</td>
          </tr>
        </thead>
        <tbody>{viewCalender}</tbody>
      </table>
    </>
  );
};

export default MonthlyCalender;
