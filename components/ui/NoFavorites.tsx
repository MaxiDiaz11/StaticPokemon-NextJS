import { Container, Text, Image } from "@nextui-org/react";

const NoFavorites = () => {
  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        height: "calc(1000vh-100px)",
      }}
    >
      <Text h1>No hay favoritos</Text>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
        alt="pikachu"
        width={250}
        height={250}
        css={{
          opacity: 0.2,
        }}
      ></Image>
    </Container>
  );
};

export default NoFavorites;
