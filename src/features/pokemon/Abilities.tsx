import React from "react";
import { Ability } from "./Ability";

export const Abilities = (props: { abilities: Array<IPokemonAbility> }) => {
  const { abilities } = props;
  return (
    <>
      {abilities.map((ability, index) => (
        <Ability ability={ability} />
      ))}
    </>
  );
};
