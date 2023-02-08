import { Card, Grid } from "@nextui-org/react";
import React from "react";
import FavoriteCardPokemon from '../pokemon/FavoriteCardPokemon';

interface Props {
  pokemons: number[];
}

const FavoritesPokemons = ({ pokemons }: Props) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id: number) => (
        <Grid xs={6} sm={3} md={2} xl={1} key={id}>
          <FavoriteCardPokemon id={id}/>
        </Grid>
      ))}
    </Grid.Container>
  );
};

export default FavoritesPokemons;
