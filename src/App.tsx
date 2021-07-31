import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useRecoilState } from "recoil";
import { currentViewState } from "./stores/store";
import MonthlyCalenderPage from "./components/pages/MonthlyCalenderPage";
import WeeklyCalaenderPage from "./components/pages/WeeklyCalenderPage";

function App() {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  console.log(currentView);

  return (
    <div className="App">
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
