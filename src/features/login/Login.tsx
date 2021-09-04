import { getAuth, signInWithPopup } from "@firebase/auth";
import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useFirebaseAuth } from "../../firebase/AuthenticationProvider";
import { googleAuthProvider } from "../../firebase/firebase";

export const Login = () => {
  const auth = getAuth();
  const user = useFirebaseAuth();

  const login = () => signInWithPopup(auth, googleAuthProvider);

  return !!user ? <Redirect to="/" /> : <Button onClick={login}>Login</Button>;
};
