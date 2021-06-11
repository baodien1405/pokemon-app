
import React, { Fragment } from 'react';
import {Pokemon} from "../hooks/usePokemon";

import PokemonCard from './PokemonCard';

const PokemonListCard: React.FunctionComponent<{
  pokemons: Pokemon[];
  selected: Set<string>;
  selectPokemon: (name: string) => void;
}> = ({pokemons, selected, selectPokemon}) => (
  <Fragment>
    {
      pokemons.map((pokemon) => <PokemonCard key={pokemon.id} {...pokemon} selected={selected.has(pokemon.name.english)} onSelected={selectPokemon} />)
    }
  </Fragment>
)
export default PokemonListCard;