import React from "react";
import "./pokemons.scss";
import { Ipokemons, IPokemon } from "./type";
import { NavLink } from "react-router-dom";
import { Pagination } from "../../components/pagination/pagination";
import { useGetPokemonByNameQuery } from "../../services/pokemon";
export const Pokemons = () => {
  const [pokemons, setPokemons] = React.useState<Ipokemons>();
  const [offset, setOffset] = React.useState(0);
  const [pages, setPages] = React.useState<number[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  React.useEffect(() => {
    async function getCountPages() {
      const pages = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0");
      const res: Ipokemons = await pages.json();
      const pagesCount = Math.ceil(res.count / 20);
      const array = new Array(pagesCount).fill(0).map((_, i) => i + 1);
      setPages(array);
    }
    getCountPages();
  }, []);
  React.useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonsList = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
      );

      const data: Ipokemons = await pokemonsList.json();
      // const res = await Promise.all(
      //   data.results.map(async (d): Promise<IPokemon> => {
      //     const x = await fetch(d.url);
      //     const y = await x.json();
      //     return y;
      //   })
      // );
      setPokemons(data);
    };
    fetchPokemons();
  }, [offset]);

  const btnCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    let x = e.target as HTMLInputElement;
    setCurrentPage(Number(x.innerHTML));
    setOffset((prev) => {
      return (Number(x.innerHTML) - 1) * 20;
    });
  };

  return (
    <div className="pokemons">
      <ul className="pokemons__list">
        {pokemons
          ? pokemons.results.map((pokemon) => {
              return (
                <li className="pokemons__item" key={pokemon.name}>
                  <NavLink
                    to={`pokemon/${pokemon.name}`}
                    className="pokemons__link"
                  >
                    {pokemon.name}
                  </NavLink>
                </li>
              );
            })
          : null}
      </ul>

      {pages.length && (
        <Pagination
          allpages={pages.length}
          page={currentPage}
          changePage={btnCount}
        />
      )}
    </div>
  );
};