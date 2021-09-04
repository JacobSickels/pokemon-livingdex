import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useFirebaseAuth } from "../firebase/AuthenticationProvider";
import { Navigation } from "./Navigation";

interface ExternalProps extends RouteProps {
  component: React.ComponentType<any>;
}

export const AuthenticatedRoute = ({
  component: Component,
  ...rest
}: ExternalProps) => {
  const user = useFirebaseAuth();
  console.log("user", user);
  return (
    <Route
      {...rest}
      component={(props: any) =>
        !!user ? (
          <>
            <Navigation />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
