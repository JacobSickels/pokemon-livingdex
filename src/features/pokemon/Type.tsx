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

const getColorFromType = (type: string) => {
  switch (type) {
    case "grass":
      return "green";
    case "poison":
    case "psychic":
      return "purple";
    case "fire":
    case "dragon":
      return "red";
    case "water":
      return "blue";
    case "bug":
      return "teal";
    case "electric":
      return "yellow";
    case "ground":
      return "brown";
    case "fairy":
      return "pink";
    case "fighting":
      return "orange";
    case "rock":
      return "grey";
    case "flying":
      return "light blue";
  }
};

export const Type = (props: { type: string }) => {
  return <StyledLabel type={props.type}>{capitalize(props.type)}</StyledLabel>;
};
