import { getAuth, signOut } from "@firebase/auth";
import React from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import { useFirebaseAuth } from "../firebase/AuthenticationProvider";

const StyledNavigation = styled.nav`
  background-color: ${(props) => props.theme.app.primary.main};
  display: flex;
  position: fixed;
  width: 100vw;
  z-index: 100;
`;

const StyledH1 = styled.h1`
  font-size: 24px;
  margin: 0;
  padding: 1rem;
  flex: 1;
  display: inline-block;
  color: ${(props) => props.theme.app.common.white};
`;

export const Navigation = () => {
  const user = useFirebaseAuth();
  const auth = getAuth();
  const logout = () => signOut(auth);

  return (
    <StyledNavigation>
      <StyledH1>MyLivingDex</StyledH1>
      <Button
        icon="log out"
        content={`Log out`}
        labelPosition="left"
        onClick={logout}
        style={{ margin: "1rem", marginRight: "2rem" }}
      />
    </StyledNavigation>
  );
};
