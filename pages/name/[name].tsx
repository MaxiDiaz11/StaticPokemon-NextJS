import React, { FC, useState } from "react";
import { Card, Container, Grid, Text, Image, Button } from "@nextui-org/react";
import { getPokemonInfo } from "../../utils/getPokemonInfo";
import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "../../components/layouts";
import { localFavorites } from "../../utils";
import { pokeApi } from "../../api";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: FC<Props> = ({ pokemon }) => {
  const [existPokemon, setExistPokemon] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toogleFavorites(pokemon.id);
    setExistPokemon(!existPokemon);

    if (existPokemon) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -160,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };
  return (
    <Layout title={`${pokemon.name}`}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height="200px"
              ></Card.Image>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!existPokemon}
                onPress={onToggleFavorite}
              >
                {existPokemon ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30} transform="capitalize">
                Sprites:
              </Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=150");

  const pokemons = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i + 1,
    name: pokemon.name,
  }));

  return {
    paths: pokemons.map((pokemon) => ({
      params: { name: pokemon.name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
