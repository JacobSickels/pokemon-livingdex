import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { FirebaseAuthProvider } from "./firebase/AuthenticationProvider";
import { FirebasePokedexProvider } from "./firebase/PokedexProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider>
      <FirebasePokedexProvider>
        <App />
      </FirebasePokedexProvider>
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
