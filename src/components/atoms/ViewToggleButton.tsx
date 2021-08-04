import { useRecoilState } from "recoil";
import { currentViewState, ViewStateType } from "../../stores/store";
import styled, { css } from "styled-components";

const Selected = styled.button`
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: black;
  width: 3em;
`;
const UnSelected = styled.button`
  font-size: 1rem;
  font-weight: 500;
  width: 3em;
`;

const ViewToggleButton = () => {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const toggleView = (viewValue: ViewStateType) => {
    setCurrentView(viewValue);
  };

  return (
    <>
      {currentView === "monthly" ? (
        <Selected onClick={() => toggleView("monthly")}>월</Selected>
      ) : (
        <UnSelected onClick={() => toggleView("monthly")}>월</UnSelected>
      )}
      {currentView === "weekly" ? (
        <Selected onClick={() => toggleView("weekly")}>주</Selected>
      ) : (
        <UnSelected onClick={() => toggleView("weekly")}>주</UnSelected>
      )}
    </>
  );
};

export default ViewToggleButton;
