type APIPath = string;

interface Pager<T> {
  count: number;
  next: string;
  previous?: string;
  results: Array<T>;
}

interface IPokedexEntry {
  name: string;
  url: string;
}

interface IAbility {
  effect_changes: Array<any>;
  effect_entries: Array<{
    effect: string;
    short_effect: string;
    language: {
      name: string;
      url: APIPath;
    };
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string; url: APIPath };
    version_group: {
      name: string;
      url: APIPath;
    };
  }>;
  generation: {
    name: string;
    url: APIPath;
  };
  id: number;
  is_main_series: boolean;
  name: string;
  names: Array<{
    language: {
      name: string;
      url: APIPath;
    };
    name: string;
  }>;

  pokemon: Array<{
    is_hidden: boolean;
    pokemon: {
      name: string;
      url: APIPath;
    };
    slot: number;
  }>;
}

interface IPokemonFrontBack {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
  animated?: Omit<IPokemonFrontBack, "animated">;
}

interface IPokemonAbility {
  ability: {
    name: string;
    url: APIPath;
  };
  is_hidden: boolean;
  slot: number;
}

interface IPokemon {
  abilities: Array<IPokemonAbility>;
  base_experience: number;
  forms: Array<{ name: string; url: APIPath }>;
  game_indices: Array<{
    game_index: number;
    version: { name: string; url: APIPath };
  }>;
  height: number;
  held_items: Array<any>;
  id: number;
  is_default: boolean;
  location_area_encounters: APIPath;
  moves: Array<{
    move: { name: string; url: APIPath };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: APIPath;
      };
      version_group: {
        name: string;
        url: APIPath;
      };
    }>;
  }>;
  name: string;
  order: number;
  past_types: Array<any>;
  species: {
    name: string;
    url: APIPath;
  };
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
    other: {
      dream_world: {
        front_default: string;
        front_female: null;
      };
      "official-artwork": {
        front_default: string;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": IPokemonFrontBack;
        yellow: IPokemonFrontBack;
      };
      "generation-ii": {
        crystal: IPokemonFrontBack;
        gold: IPokemonFrontBack;
        silver: IPokemonFrontBack;
      };
      "generation-iii": {
        emerald: IPokemonFrontBack;
        "firered-leafgreen": IPokemonFrontBack;
        "ruby-sapphire": IPokemonFrontBack;
      };
      "generation-iv": {
        "diamond-pearl": IPokemonFrontBack;
        "heartgold-soulsilver": IPokemonFrontBack;
        platinum: IPokemonFrontBack;
      };
      "generation-v": {
        "black-white": IPokemonFrontBack;
      };
      "generation-vi": {
        "omegaruby-alphasapphire": IPokemonFrontBack;
        "x-y": IPokemonFrontBack;
      };
      "generation-vii": {
        icons: IPokemonFrontBack;
        "ultra-sun-ultra-moon": IPokemonFrontBack;
      };
      "generation-viii": {
        icons: IPokemonFrontBack;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: "hp" | "attack" | "defense"; url: APIPath };
  }>;
  types: Array<{
    slot: number;
    type: { name: string; url: APIPath };
  }>;
  weight: number;
}
