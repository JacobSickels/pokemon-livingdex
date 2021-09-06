import { child, get, getDatabase, ref, set } from "firebase/database";

export const addToPokedex = (userId: string, pokemonId: number) => {
  const database = getDatabase();

  const pokedexRef = ref(database);

  // Get the snapshot value of the pokedex in firebase
  get(child(pokedexRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const dbPokedex = snapshot.val() as Array<number>;

        // Join the local selection to the db pokedex
        const newPokedex = Array.from(new Set([...dbPokedex, pokemonId]));

        // Set new pokedex value to firebase
        set(ref(database, "users/" + userId), newPokedex);
      } else {
        // Just send new pokedex value if it doesn't exist in firebase
        set(ref(database, "users/" + userId), [pokemonId]);
      }
    })
    .catch((error) => {
      console.error(`Error Receiving Pokedex for user ${userId}`, error);
    });
};

export const removeFromPokedex = (userId: string, pokemonId: number) => {
  const database = getDatabase();

  const pokedexRef = ref(database);

  // Get the snapshot value of the pokedex in firebase
  get(child(pokedexRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const dbPokedex = snapshot.val() as Array<number>;

        // Remove pokemon id from database pokedex
        const newPokedex = Array.from(
          new Set(dbPokedex.filter((id) => id !== pokemonId))
        );

        // Set new pokedex value to firebase
        set(ref(database, "users/" + userId), newPokedex);
      }
    })
    .catch((error) => {
      console.error(`Error Receiving Pokedex for user ${userId}`, error);
    });
};
