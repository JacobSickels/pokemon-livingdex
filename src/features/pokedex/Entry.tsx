import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image, Label, Segment } from "semantic-ui-react";
import { capitalize } from "../../utils/utils";

export const Entry = (props: any) => {
  const id = props.entry.url.split("/").slice(-2, -1)[0];
  return (
    <Segment>
      {capitalize(props.entry.name)}
      <Label style={{ float: "right" }}>
        # {id.toString().padStart(3, "0")}
      </Label>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      />
      <div style={{ textAlign: "right" }}>
        <Link to={`/pokemon/${id}`}>
          <Icon name="info" /> More Info
        </Link>
      </div>
    </Segment>
  );
};
