import styled from "styled-components";
import { capitalize } from "../../utils/utils";

const StyledLabel = styled.div<{ type: string }>`
  display: inline-block;
  padding: 0.5rem 0.5rem;
  border-radius: 4px;
  line-height: 1rem;
  font-size: 1rem;
  color: ${(props) => props.theme[props.type]?.front};
  background-color: ${(props) => props.theme[props.type]?.back};
`;

export const Type = (props: { type: string }) => {
  return <StyledLabel type={props.type}>{capitalize(props.type)}</StyledLabel>;
};
