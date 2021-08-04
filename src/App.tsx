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

  return (
    <div className="App">
      {toggleScheduleInput.toggle ? <InputScheduleModal /> : null}
      <div className="Contents">
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
    </div>
  );
}

export default App;
