import { FC } from "react";
import { Navbar } from "../ui";
import Head from "next/head";

interface Props {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  const origin = typeof window === "undefined" ? "" : window.location.origin;

  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Maxi Diaz"></meta>
        <meta
          name="description"
          content={`Informacion sobre el pokemon ${title}`}
        ></meta>
        <meta name="keywords" content={`${title}, pokemon, pokedex`}></meta>
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content="Proyecto sobre Pokemones usando NextJS"
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar></Navbar>

      <main
        style={{
          padding: "10px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
