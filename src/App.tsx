import { Box } from '@fower/react';
import { styled } from "@fower/styled";
import { useCallback } from 'react';
import usePokemon from "./hooks/usePokemon";
import PokemonListCard from './components/PokemonListCard';
import Search from './containers/SearchPage';
import "antd/dist/antd.css";

const Input = styled("input");

function App() {
  const {filter, pokemons, setFilter, selectPokemon, selected} = usePokemon();

  const onSetFilter = useCallback((e) => setFilter(e.target.value), [setFilter]);

  return (
      <Box p-10 maxW-1200 m="auto">
        <Box w="100%" m="auto" text5XL fontBold textCenter color="blue600">Pokemon App</Box>
        <Input
          text3XL
          p-5
          border-1
          roundedXL
          borderGray500
          w="100%"
          value={filter}
          onChange={onSetFilter}
          placeholder="Search pokemon..."
          p3
        />

        <Box
          grid
          gridTemplateColumns-2--md
          gridTemplateColumns-1--sm
          gap-10
          mt-10
        >

        <PokemonListCard pokemons={pokemons} selected={selected} selectPokemon={selectPokemon} />

        </Box>

        <Box mt-20>
          <Box w="100%" m="auto" text5XL fontBold textCenter color="blue600">Management</Box>
          <Search />
        </Box>
      </Box>
  );
}

export default App;
