import { Card } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  id: number;
}

const FavoriteCardPokemon = ({ id }: Props) => {
  const router = useRouter();

  const onFavoriteClick = (id: number) => {
    router.push(`/pokemon/${id}`);
  };
  return (
    <Card
      isHoverable
      isPressable
      css={{ padding: 10 }}
      onPress={() => onFavoriteClick(id)}
    >
      <Card.Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        width={"100%"}
        height={"140px"}
      ></Card.Image>
    </Card>
  );
};

export default FavoriteCardPokemon;
