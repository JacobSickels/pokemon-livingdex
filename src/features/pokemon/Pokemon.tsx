import React from "react";
import { useQuery } from "react-query";
import { Card, Image, Label } from "semantic-ui-react";
import { get } from "../../utils/api";
import { capitalize } from "../../utils/utils";
import { Type } from "./Type";

export const Pokemon = (props: any) => {
  const { id } = props;
  const { data } = useQuery<IPokemon>(
    ["pokemon", id],
    () => get<IPokemon>(`/pokemon/${id}`),
    {
      cacheTime: 50000,
      staleTime: 50000,
    }
  );

  return (
    <Card style={{ margin: "2rem" }}>
      <Image
        ui={true}
        src={data?.sprites.front_default}
        style={{ alignItems: "flex-start" }}
      />

      <Card.Content>
        <Card.Header style={{ paddingBottom: "0.5rem" }}>
          {capitalize(data?.name)}
          <Label style={{ float: "right" }}>
            # {data?.id.toString().padStart(3, "0")}
          </Label>
        </Card.Header>
        <Card.Meta>
          {data?.types.map((type) => (
            <Type type={type?.type?.name} />
          ))}
        </Card.Meta>
      </Card.Content>
      {/* <Card.Content extra>
        <Link
          style={{ display: "inline-block" }}
          to={`/pokemon/${parseInt(id, 10) - 1}`}
        >
          <Icon name="angle double left" />
          Previous
        </Link>
        <Link
          style={{ float: "right", display: "inline-block" }}
          to={`/pokemon/${parseInt(id, 10) + 1}`}
        >
          Next
          <Icon name="angle double right" />
        </Link>
      </Card.Content> */}
    </Card>
  );
};
