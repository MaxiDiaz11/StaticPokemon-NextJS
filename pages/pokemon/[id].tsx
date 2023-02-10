import React, { FC, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
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
  const pokemons150 = [...Array(150)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons150.map((id) => ({
      params: { id },
    })),

    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonPage;
