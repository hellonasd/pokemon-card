import React from "react";
import { getPixels } from "../../utils/getColors/getPixels";
import "./pokemonPreview.scss";

interface PokemonPreviewProps {
  src: string;
  name: string;
  id: number;
}

export const PokemonPreview: React.FC<PokemonPreviewProps> = ({
  id,
  name,
  src,
}) => {
  return (
    <li className="pokemonPreview">
      <div className="pokemonPreview__wrapper">
        <span className="pokemonPreview__number">
          #{id < 10 ? `00${id}` : id > 10 && id < 100 ? `0${id}` : id}
        </span>
        <img src={src} alt="" className="pokemonPreview__img" />

        <p className="pokemonPreview__name">{name}</p>
      </div>
    </li>
  );
};
