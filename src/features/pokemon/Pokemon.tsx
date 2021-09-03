import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionTitleProps,
  Card,
  Icon,
  Image,
  Label,
  Placeholder,
} from "semantic-ui-react";
import { get } from "../../utils/api";
import { capitalize } from "../../utils/utils";
import { Abilities } from "./Abilities";
import { Type } from "./Type";

export const Pokemon = (props: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const id = props.match.params.id;
  const { data, isLoading } = useQuery<IPokemon>(["pokemon", id], () =>
    get<IPokemon>(`/pokemon/${id}`)
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
    <>
      <Card>
        {isLoading ? (
          <Placeholder>
            <Placeholder.Image square />
          </Placeholder>
        ) : (
          <Image src={data?.sprites.front_default} wrapped ui={false} />
        )}
        <Card.Content>
          <Card.Header style={{ paddingBottom: "0.5rem" }}>
            {capitalize(data?.name)}
            <Label style={{ float: "right" }}>
              <Icon name="info circle" />
              {data?.id}
            </Label>
          </Card.Header>
          <Card.Meta>
            {data?.types.map((type) => (
              <Type type={type?.type?.name} />
            ))}
          </Card.Meta>
        </Card.Content>
        {/* <Card.Content extra>
          {data?.types.map((type) => (
            <Type type={type?.type?.name} />
          ))}
        </Card.Content> */}
      </Card>

      <Link to={`/pokemon/${parseInt(id, 10) + 1}`}>Next</Link>

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

        {/* <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          What kinds of dogs are there?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            There are many breeds of dogs. Each breed varies in size and
            temperament. Owners often select a breed of dog that they find to be
            compatible with their own lifestyle and desires from a companion.
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          How do you acquire a dog?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            Three common ways for a prospective owner to acquire a dog is from
            pet shops, private owners, or shelters.
          </p>
          <p>
            A pet shop may be the most convenient way to buy a dog. Buying a dog
            from a private owner allows you to assess the pedigree and
            upbringing of your dog before choosing to take it home. Lastly,
            finding your dog from a shelter, helps give a good home to a dog who
            may not find one so readily.
          </p>
        </Accordion.Content> */}
      </Accordion>
    </>
  );
};
