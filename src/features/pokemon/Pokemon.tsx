import React from "react";
import { useQuery } from "react-query";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import { addToPokedex, removeFromPokedex } from "../../firebase/actions";
import { useFirebaseAuth } from "../../firebase/AuthenticationProvider";
import { usePokedex } from "../../firebase/PokedexProvider";
import { get } from "../../utils/api";
import { capitalize } from "../../utils/utils";
import { Type } from "./Type";

export const Pokemon = (props: any) => {
  const { id } = props;
  const pokedex = usePokedex();
  const user = useFirebaseAuth();

  const { data } = useQuery<IPokemon>(
    ["pokemon", id],
    () => get<IPokemon>(`/pokemon/${id}`),
    {
      enabled: !!id,
      cacheTime: 50000,
      staleTime: 50000,
    }
  );

  const onClickCaught = () => {
    if (pokedex?.includes(parseInt(id, 10))) {
      removeFromPokedex(user!.uid, id);
    } else {
      addToPokedex(user!.uid, id);
    }
  };

  return (
    <Card style={{ margin: "2rem" }}>
      <Image
        ui={true}
        src={data?.sprites.front_default}
        style={{ alignItems: "flex-start" }}
      />

      <Card.Content>
        <Card.Header style={{ paddingBottom: "0.5rem" }}>
          <Grid>
            <Grid.Row style={{ display: "flex" }}>
              <Grid.Column style={{ flex: 1 }}>
                <h3>{capitalize(data?.name)}</h3>
              </Grid.Column>
              <Grid.Column style={{ minWidth: "10rem" }}>
                <Button
                  onClick={onClickCaught}
                  icon={
                    pokedex?.includes(parseInt(id, 10))
                      ? "check circle"
                      : "circle outline"
                  }
                  label={`# ${data?.id.toString().padStart(3, "0")}`}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        {data?.types.map((type) => (
          <Type type={type?.type?.name} />
        ))}
      </Card.Content>
    </Card>
  );
};
