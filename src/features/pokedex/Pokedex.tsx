import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import { useFirebaseAuth } from "../../firebase/AuthenticationProvider";
import { list } from "../../utils/api";
import { getUrlParams } from "../../utils/utils";
import { Button } from "../../_shared/Button";
import { Pokemon } from "../pokemon/Pokemon";
import { Entry } from "./Entry";

const Sidebar = styled.div`
  min-width: 24rem;
  background-color: ${(props) => props.theme.app.primary.light};
  height: 100vh;
  position: fixed;
  right: 0;
`;

export const Pokedex = (props: any) => {
  const [selected, setSelected] = useState<number>(1);
  const user = useFirebaseAuth();
  console.log(user);

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Pager<IPokedexEntry>>(
      ["pokedex"],
      ({
        pageParam = {
          limit: 24,
          offset: 0,
        },
      }) => list<IPokedexEntry>(`/pokemon`, pageParam),
      {
        cacheTime: 50000,
        staleTime: 50000,
        getNextPageParam: (lastPage, pages) => getUrlParams(lastPage.next),
      }
    );

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginRight: "24rem" }}>
          <Grid columns={3} style={{ margin: "2rem", marginBottom: "1rem" }}>
            {data?.pages.map((p) => (
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
                {p.results.map((result) => (
                  <Grid.Column style={{ marginBottom: "1rem" }}>
                    <Entry
                      key={result.name}
                      entry={result}
                      onSelected={setSelected}
                    />
                  </Grid.Column>
                ))}
              </Grid.Row>
            ))}
          </Grid>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </Button>
          </div>
        </div>
        <Sidebar>
          <Pokemon id={selected} />
        </Sidebar>
      </div>
    </>
  );
};
