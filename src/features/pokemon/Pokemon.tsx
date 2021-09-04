import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionTitleProps,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import { get } from "../../utils/api";
import { capitalize } from "../../utils/utils";
import { Abilities } from "./Abilities";
import { Type } from "./Type";

export const Pokemon = (props: any) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const id = props.match.params.id;
  const { data, isLoading } = useQuery<IPokemon>(
    ["pokemon", id],
    () => get<IPokemon>(`/pokemon/${id}`),
    {
      cacheTime: 50000,
      staleTime: 50000,
    }
  );

  const handleClick = (e: any, data: AccordionTitleProps) => {
    const { index } = data;
    const newIndex =
      activeIndex === parseInt(`${index}` || "0", 10)
        ? -1
        : parseInt(`${index}` || "0", 10);

    setActiveIndex(newIndex);
  };

  return (
    <Container>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header as="h1">{capitalize(data?.name)}</Header>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Abilities
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Abilities abilities={data?.abilities || []} />
              </Accordion.Content>
            </Accordion>
          </Grid.Column>

          <Grid.Column width={4}>
            <Card>
              <Image ui={true} src={data?.sprites.front_default} />

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
              <Card.Content extra>
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
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
