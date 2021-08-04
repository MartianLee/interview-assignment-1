import styled from "styled-components";

interface TodayType {
  alignText?: string;
}

export const Today = styled.div<TodayType>`
  background: #0078ff;
  border-radius: 50%;
  font-weight: 500;
  color: white;
  padding: 4px;
  width: 1.1em;
  margin: ${(props) => (props.alignText == "center" ? "6px auto" : "10px")};
`;
