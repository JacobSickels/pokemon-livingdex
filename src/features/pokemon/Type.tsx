import React from "react";
import { Label } from "semantic-ui-react";
import { capitalize } from "../../utils/utils";

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
  return (
    <Label className={getColorFromType(props.type)}>
      {capitalize(props.type)}
    </Label>
  );
};
