import React from "react";
import { useQuery } from "react-query";
import { get } from "../../utils/api";
import { capitalize } from "../../utils/utils";

export const Ability = (props: { ability: IPokemonAbility }) => {
  const abilityId = props.ability.ability.url.split("/").slice(-2, -1)[0];

  const { data } = useQuery<IAbility>(
    ["abilities", abilityId],
    () => get<any>(`/ability/${abilityId}`),
    {
      enabled: false,
    }
  );

  return (
    <div>
      <div>{capitalize(data?.name)}</div>
      <div>
        {data?.effect_entries.find((ee) => ee.language.name === "en")?.effect}
      </div>
    </div>
  );
};
