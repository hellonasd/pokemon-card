import React from "react";
import { useParams } from "react-router-dom";
import { IPokemon } from "../pokemons/type";
import { useGetPokemonByNameQuery } from "../../services/pokemon";
import { getPixels } from "../../utils/getColors/getPixels";
import { NavLink } from "react-router-dom";
import { PokemonStats } from "../../components/pokemon-stats/pokemonStats";
import arrowBack from "../../assets/prev.svg";
import "./pokemon.scss";

export const Pokemon = () => {
  const { id } = useParams();
  const [pixels, setPixels] = React.useState<
    { r: number; g: number; b: number }[]
  >([]);
  const [pokemon, setPokemon] = React.useState<IPokemon>();
  const { data, error, isLoading } = useGetPokemonByNameQuery(id!);

  React.useEffect(() => {
    if (data) {
      getPixels(data.sprites.other["official-artwork"].front_default!)
        .then((p) => {
          p = p.map((c) => {
            if (c.r >= 245 && c.g >= 245 && c.b >= 245) {
              c.r = c.r - 50;
              c.g = c.g - 50;
              c.b = c.b - 50;
              return c;
            }
            return c;
          });
          setPixels(p);
        })
        .then(() => setPokemon(data));
    }
  }, [data]);
  if (!pokemon) {
    return <h2>loading....</h2>;
  }
  return (
    <div className="pokemon">
      <div
        className="pokemon__wrapper"
        style={{
          backgroundColor: `rgb(${pixels[pixels.length - 2].r}, ${
            pixels[pixels.length - 2].g
          }, ${pixels[pixels.length - 2].b})`,
        }}
      >
        <header className="pokemon__header">
          <NavLink to={"/"} className="pokemon__back-btn">
            <img src={arrowBack} alt="" className="pokemon__prev" />
          </NavLink>
          <h3 className="pokemon__name">{pokemon.name}</h3>
          <span className="pokemon__id">
            #
            {pokemon?.id! < 10
              ? `00${pokemon?.id}`
              : pokemon?.id! > 10 && pokemon?.id! < 100
              ? `0${pokemon?.id}`
              : pokemon?.id!}
          </span>
        </header>
        <div className="pokemon__main-img">
          <img
            style={{ width: "200px", height: "200px" }}
            src={pokemon?.sprites.other["official-artwork"].front_default!}
            alt=""
            className="pokemon__front-img"
          />
        </div>
        <main className="pokemon__info">
          <div className="pokemon__info-wrapper">
            <div className="pokemon__type">
              <span
                className="pokemon__type-of-animal"
                style={{
                  backgroundColor: `rgb(${pixels[pixels.length - 2].r}, ${
                    pixels[pixels.length - 2].g
                  }, ${pixels[pixels.length - 2].b})`,
                }}
              >
                {pokemon.types[0].type.name}
              </span>

              {pokemon.types.length >= 2 ? (
                <span
                  className="pokemon__type-of-variety"
                  style={{
                    backgroundColor: `rgb(${pixels[pixels.length - 1].r}, ${
                      pixels[pixels.length - 1].g
                    }, ${pixels[pixels.length - 1].b})`,
                  }}
                >
                  {pokemon.types[1].type.name}
                </span>
              ) : null}
            </div>
            <h3
              className="pokemon__about"
              style={{
                color: `rgb(${pixels[pixels.length - 1].r}, ${
                  pixels[pixels.length - 1].g
                }, ${pixels[pixels.length - 1].b})`,
              }}
            >
              About
            </h3>
            <div className="pokemon__body">
              <div className="pokemon__weight">
                <span className="pokemon__kg">{pokemon.weight / 10} kg</span>
                <span className="pokemon__weight-name">Weight</span>
              </div>
              <div className="pokemon__height">
                <span className="pokemon__h">{pokemon.height / 10}m</span>
                <span className="pokemon__height-name">Height</span>
              </div>
              <div className="pokemon__abilities">
                <span className="pokemon__abilitie">
                  {pokemon.abilities[0].ability.name}
                </span>
                <span className="pokemon__abilitie">
                  {pokemon.abilities.length >= 2
                    ? pokemon.abilities[1].ability.name
                    : null}
                </span>
                <span className="pokemon__abilitie-name">Moves</span>
              </div>
            </div>
            <div className="pokemon__base">
              <h3
                className="pokemon__base-stats"
                style={{
                  color: `rgb(${pixels[pixels.length - 1].r}, ${
                    pixels[pixels.length - 1].g
                  }, ${pixels[pixels.length - 1].b})`,
                }}
              >
                Base Stats
              </h3>
              {pokemon.stats.map((stat, i) => {
                return (
                  <PokemonStats
                    base_stat={stat.base_stat}
                    stat={stat.stat}
                    effort={stat.effort}
                    pixels={pixels}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
