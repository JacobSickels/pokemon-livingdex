import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Grid, Menu, Segment, Sidebar, Sticky } from "semantic-ui-react";
import { list } from "../../utils/api";
import { getUrlParams } from "../../utils/utils";
import { Button } from "../../_shared/Button";
import { Pokemon } from "../pokemon/Pokemon";
import { Entry } from "./Entry";

export const Pokedex = (props: any) => {
  const [selected, setSelected] = useState<number | null>(null);

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
      <Sidebar.Pushable style={{ position: "fixed" }}>
        <Sticky>
          <Sidebar
            as={Menu}
            animation="overlay"
            direction="right"
            icon="labeled"
            vertical
            style={{
              position: "fixed",
              backgroundColor: "#EFF4FA",
            }}
            visible={!!selected}
          >
            <div style={{ paddingTop: "5rem" }}>
              <Pokemon id={selected} />
              <Button onClick={() => setSelected(null)}>Close</Button>
            </div>
          </Sidebar>
        </Sticky>

        <Sidebar.Pusher style={{ overflow: "scroll", height: "100%" }}>
          <Segment basic>
            <Grid
              style={{
                margin: "2rem",
                marginBottom: "1rem",
                marginTop: "5rem",
              }}
            >
              {data?.pages.map((p) => (
                <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
                  {p.results.map((result) => (
                    <Grid.Column
                      style={{ marginBottom: "1rem" }}
                      mobile={16}
                      tablet={8}
                      computer={selected ? 5 : 4}
                    >
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
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>

      {/* {selected && (
          <Sidebar>
            <Button
              icon
              style={{ margin: "1rem" }}
              onClick={() => setSelected(null)}
            >
              <Icon name="close" />
            </Button>
            <Pokemon id={selected} />
          </Sidebar>
        )} */}
      {/* </div> */}
    </>
  );
};
