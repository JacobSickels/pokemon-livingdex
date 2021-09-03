import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Pokemon } from "./features/pokemon/Pokemon";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/pokemon/:id" component={Pokemon} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
