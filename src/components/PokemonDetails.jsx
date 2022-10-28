import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const [pokeInfo, setPokeInfo] = useState();

  const { name } = useParams();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    axios
      .get(URL)
      .then((res) => setPokeInfo(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(pokeInfo);

  return (
    <article className="card_pokein">
      <div className="general__details">
        <img
          src={pokeInfo?.sprites.other["official-artwork"].front_default}
          alt=""
          className="photo__details"
        />
        <h2 className="name__info">{pokeInfo?.name}</h2>
        <h2 className="card__id">#{pokeInfo?.id}</h2>
        <hr />
        <ul className="name__stat">
          <li>{pokeInfo?.stats[0].stat.name}</li>
          <li>{pokeInfo?.stats[0].base_stat}%</li>
          <li>{pokeInfo?.stats[1].stat.name}</li>
          <li>{pokeInfo?.stats[1].base_stat}%</li>
          <li>{pokeInfo?.stats[2].stat.name}</li>
          <li>{pokeInfo?.stats[2].base_stat}%</li>
          <li>{pokeInfo?.stats[3].stat.name}</li>
          <li>{pokeInfo?.stats[3].base_stat}%</li>
          <li>{pokeInfo?.stats[4].stat.name}</li>
          <li>{pokeInfo?.stats[4].base_stat}%</li>
          <li>{pokeInfo?.stats[5].stat.name}</li>
          <li>{pokeInfo?.stats[5].base_stat}%</li>
        </ul>
        </div>
        <ul className="details__abilit">
          {pokeInfo?.abilities.map((abilit) => (
            <li className="details__abilit-text" key={abilit.ability.name}> <br />abilities <br />{abilit.ability.name}
            </li>
          ))}
        </ul>
        <div className="details__move">
          {pokeInfo?.moves.map((mov) => (
            <div className="details__move-text" key={mov.move.name}> Moves {mov.move.name}</div>
          ))}
        </div>
        <div className="details__he-we">
         
         <div className="details__he-we-text">Height <hr />{pokeInfo?.height} <br />
         Weight <hr />{pokeInfo?.weight}</div>
        </div>
     
    </article>
  );
};

export default PokemonDetails;
