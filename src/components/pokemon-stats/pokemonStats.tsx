import type { PokemonStat } from "../../pages/pokemons/type";
import { acronym } from "../../utils/acronym/acronym";
import { getProcentStat } from "../../utils/getProcentStat/getProcentStat";
import "./pokemonStat.scss";

interface IPokemonStatProps extends PokemonStat {
  pixels: { r: number; g: number; b: number }[];
}

export const PokemonStats: React.FC<IPokemonStatProps> = ({
  stat,
  base_stat,
  pixels,
}) => {
  return (
    <div className="stats">
      <span
        style={{
          color: `rgb(${pixels[pixels.length - 1].r},${
            pixels[pixels.length - 1].g
          }, ${pixels[pixels.length - 1].b})`,
        }}
        className="stats__name"
      >
        {acronym(stat.name)}
      </span>
      <span className="stats__number">{base_stat}</span>
      <div
        className="stats__track"
        style={{
          backgroundColor: `rgb(${pixels[pixels.length - 1].r},${
            pixels[pixels.length - 1].g
          }, ${pixels[pixels.length - 1].b})`,
          width: "100%",
          height: "5px",
        }}
      >
        <div
          className="stats__progress"
          style={{
            backgroundColor: `rgb(${pixels[pixels.length - 2].r - 50},${
              pixels[pixels.length - 2].g - 50
            }, ${pixels[pixels.length - 2].b - 50})`,
            width: getProcentStat(base_stat) + "%",
            height: "5px",
          }}
        ></div>
      </div>
    </div>
  );
};
