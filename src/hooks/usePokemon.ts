import { useEffect, useState, useMemo, useCallback } from 'react';

export interface Pokemon {
  id: number,
  name: {
    english: string;
    japanese: string;
  },
  type: string[],
  base: Record<string, number>
}

export function usePokemon(): {
  pokemons: Pokemon[];
  filter: string;
  setFilter: (filter: string | ((filter: string) => string)) => void;
  selected: Set<string>;
  selectPokemon: (name: string) => void;
} {
  const [filter, setFilter] = useState("");
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("/pokemon.json")
      .then(res => res.json())
      .then((pokemon: Pokemon[]) => setAllPokemon(pokemon))
  }, [])

  const pokemons = useMemo(() => {
    const lcFilter = filter.toLowerCase();
    return allPokemon.filter((pokemon) => pokemon.name.english.toLowerCase().includes(lcFilter)).slice(0, 10);
  }, [filter, allPokemon]);

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const selectPokemon = useCallback((name: string) => {
    setSelected((currentSet) => {
      const newSet = new Set(currentSet);
      if (currentSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    })
  }, [])

  return {
    pokemons,
    filter,
    setFilter,
    selected,
    selectPokemon
  }
}

export default usePokemon;