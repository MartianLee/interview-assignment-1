import styled from "styled-components";

interface DayType {
  thisMonth: boolean;
  alignText: string;
}

export const NormalDay = styled.div<DayType>`
  text-align: ${(props) => props.alignText};
  color: ${(props) => (props.thisMonth ? "grey" : "lightgray")};
  margin: 10px;
`;
