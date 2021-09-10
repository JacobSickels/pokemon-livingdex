import { getAuth, signInWithPopup } from "@firebase/auth";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";
import { Button, Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { useFirebaseAuth } from "../../firebase/AuthenticationProvider";
import { googleAuthProvider } from "../../firebase/firebase";
import { get } from "../../utils/api";
import { SafeImage } from "../../_shared/SafeImage";

const StyledColumn = styled(Grid.Column)`
  background-color: ${(props) => props.theme.app.primary.main};
  text-align: center;
`;

const CenteredDiv = styled.div<{ image?: boolean }>`
  top: calc(50% - ${(props) => (props.image ? "10rem" : "1rem")});
  position: relative;
`;

const StyledH1 = styled.h1`
  font-size: 24px;
  margin: 0;
  padding: 1rem;
  flex: 1;
  display: inline-block;
  color: ${(props) => props.theme.app.common.white};
`;

export const Login = () => {
  const auth = getAuth();
  const user = useFirebaseAuth();
  const randomPokemonId = useMemo(
    () => Math.floor(Math.random() * 898) + 1,
    []
  );

  const { data } = useQuery<IPokemon>(
    ["pokemon", randomPokemonId],
    () => get<IPokemon>(`/pokemon/${randomPokemonId}`),
    {
      cacheTime: 50000,
      staleTime: 50000,
    }
  );

  const login = () => signInWithPopup(auth, googleAuthProvider);

  return !!user ? (
    <Redirect to="/" />
  ) : (
    <Grid columns={2} style={{ height: "100vh", margin: 0 }}>
      <Grid.Row style={{ padding: 0 }}>
        <StyledColumn mobile={16} tablet={8} computer={8}>
          <CenteredDiv image>
            {!!data && (
              <SafeImage
                ui={true}
                src={data?.sprites.front_default}
                style={{ width: "15rem", margin: "auto" }}
              />
            )}
            <StyledH1>My Living Dex</StyledH1>
          </CenteredDiv>
        </StyledColumn>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <CenteredDiv style={{ textAlign: "center" }}>
            <Button onClick={login}>
              <Icon name="google" />
              Login with Google
            </Button>
          </CenteredDiv>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
