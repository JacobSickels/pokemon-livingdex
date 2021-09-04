import React from "react";
import { Grid, Image, Label, Segment } from "semantic-ui-react";
import styled from "styled-components";
import { capitalize } from "../../utils/utils";

const StyledSegment = styled(Segment)`
  &:hover {
    cursor: pointer;
    background-color: #f1f1f1;
  }
`;

interface EntryProps {
  entry: IPokedexEntry;
  onSelected: React.Dispatch<React.SetStateAction<number>>;
}

export const Entry = (props: EntryProps) => {
  const id = props.entry.url.split("/").slice(-2, -1)[0];

  const onSegmentClick = () => {
    props.onSelected(parseInt(id, 10));
  };

  return (
    <StyledSegment onClick={onSegmentClick}>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image
              style={{ backgroundColor: "#EFF4FA", borderRadius: "10rem" }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            />
          </Grid.Column>
          <Grid.Column>
            <Label style={{ marginTop: "1rem" }}>
              # {id.toString().padStart(3, "0")}
            </Label>
            <p style={{ marginTop: "1rem" }}>{capitalize(props.entry.name)}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </StyledSegment>
  );
};
