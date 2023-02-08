import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts/Layout";
import { NoFavorites, FavoritesPokemons } from "../../components/ui";
import { localFavorites } from "../../utils";

const FavoritePage = () => {
  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setfavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favorites Pokémons">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritesPokemons pokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritePage;
