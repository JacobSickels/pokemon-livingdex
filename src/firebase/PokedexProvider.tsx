import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { useFirebaseAuth } from "./AuthenticationProvider";

type Pokedex = Array<number> | null;
type ContextState = { pokedex: Pokedex };

const FirebasePokedexContext = React.createContext<ContextState | undefined>(
  undefined
);

const FirebasePokedexProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pokedex, setPokedex] = React.useState<Pokedex>(null);
  const value = { pokedex };
  const database = getDatabase();
  const user = useFirebaseAuth();

  useEffect(() => {
    const pokedexRef = ref(database, `users/${user?.uid}`);

    onValue(pokedexRef, (snapshot) => {
      if (snapshot.exists()) {
        setPokedex(snapshot.val());
      } else {
        setPokedex([]);
      }
    });

    return () => {};
  }, [user]);

  return (
    <FirebasePokedexContext.Provider value={value}>
      {children}
    </FirebasePokedexContext.Provider>
  );
};

function usePokedex() {
  const context = React.useContext(FirebasePokedexContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context.pokedex;
}

export { FirebasePokedexProvider, usePokedex };
