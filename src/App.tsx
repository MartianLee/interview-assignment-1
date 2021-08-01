import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useRecoilState } from "recoil";
import { currentViewState, toggleScheduleInputState } from "./stores/store";
import MonthlyCalenderPage from "./components/pages/MonthlyCalenderPage";
import WeeklyCalaenderPage from "./components/pages/WeeklyCalenderPage";
import InputScheduleModal from "./components/organism/InputScheduleModal";

function App() {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [toggleScheduleInput, setToggleScheduleInput] = useRecoilState(
    toggleScheduleInputState
  );
  console.log(currentView);

  return (
    <div className="App">
      {toggleScheduleInput ? <InputScheduleModal /> : null}
      {currentView === "monthly" ? (
        <MonthlyCalenderPage></MonthlyCalenderPage>
      ) : (
        ""
      )}
      {currentView === "weekly" ? (
        <WeeklyCalaenderPage></WeeklyCalaenderPage>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
