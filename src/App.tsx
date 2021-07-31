import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useRecoilState } from "recoil";
import { currentViewState } from "./stores/store";
import MonthlyCalender from "./components/pages/MonthlyCalender";
import WeeklyCalaender from "./components/pages/WeeklyCalender";

function App() {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  console.log(currentView);

  return (
    <div className="App">
      {currentView === "monthly" ? <MonthlyCalender></MonthlyCalender> : ""}
      {currentView === "weekly" ? <WeeklyCalaender></WeeklyCalaender> : ""}
    </div>
  );
}

export default App;
