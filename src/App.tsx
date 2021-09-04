import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { Login } from "./features/login/Login";
import { Pokedex } from "./features/pokedex/Pokedex";
import { Pokemon } from "./features/pokemon/Pokemon";
import { AuthenticatedRoute } from "./_shared/AuthenticatedRoute";

const queryClient = new QueryClient();

const theme = {
  app: {
    common: {
      white: "#ffffff",
      black: "#000000",
    },
    primary: {
      main: "#18314F", // prussian blue
      light: "#EFF4FA",
    },
  },
  normal: {
    front: "#000000",
    back: "#E8E5DA",
  },
  grass: {
    front: "#000000",
    back: "#73AB84",
  },
  ghost: {
    front: "#ffffff",
    back: "#693668",
  },
  psychic: {
    front: "#ffffff",
    back: "#B47EB3",
  },
  fire: {
    front: "#000000",
    back: "#FE5E41",
  },
  dragon: {
    front: "#ffffff",
    back: "#53131E",
  },
  water: {
    front: "#ffffff",
    back: "#3083DC",
  },
  bug: {
    back: "#1B998B",
    front: "#ffffff",
  },
  electric: {
    back: "#FFBA49",
    front: "#000000",
  },
  ground: {
    front: "#ffffff",
    back: "#B07156",
  },
  fairy: {
    front: "#000000",
    back: "#FFE2FE",
  },
  fighting: {
    front: "#000000",
    back: "#F79F79",
  },
  rock: {
    front: "#ffffff",
    back: "#2A3D45",
  },
  flying: {
    front: "#000000",
    back: "#8EB8E5",
  },
  poison: {
    front: "#ffffff",
    back: "#6200B3",
  },
  dark: {
    front: "#ffffff",
    back: "#27232F",
  },
  steel: {
    front: "#000000",
    back: "#A3ABB8",
  },
  ice: {
    front: "#000000",
    back: "#C0D8E0",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <AuthenticatedRoute path="/" exact component={Pokedex} />
            <AuthenticatedRoute path="/pokemon/:id" component={Pokemon} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
