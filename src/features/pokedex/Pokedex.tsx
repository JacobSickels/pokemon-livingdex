import React from "react";
import { useInfiniteQuery } from "react-query";
import { Container, Grid } from "semantic-ui-react";
import { list } from "../../utils/api";
import { getUrlParams } from "../../utils/utils";
import { Entry } from "./Entry";

export const Pokedex = (props: any) => {
  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
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
    <Container>
      <Grid columns={3}>
        {data?.pages.map((p) => (
          <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
            {p.results.map((result) => (
              <Grid.Column>
                <Entry key={result.name} entry={result} />
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}
      </Grid>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </Container>
  );
};
