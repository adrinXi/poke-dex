import axios from "axios";
import React, { useEffect, useState } from "react";
import StatPokemon from "./StatPokemon";
import "./style.css";
import { useNavigate } from "react-router-dom";


const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState();
  const [colors, setColors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setPokemon(res.data), setColors(res.data.types[0].type.name);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(colors);
  const handleClick = () => navigate(`/pokedex/${pokemon.name}`);

  return (
    <article onClick={handleClick} className={`card ${pokemon?.types[0].type.name}`}>
    <header className={`card__header bg-${pokemon?.types[0].type.name}`}>
      <img className='card__avatar' src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt="" />

    </header>
    <div className='card__body'>
    <section>
      <h3 className={`card__name color-text-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
      <ul className='card__list-type'>
        {
          pokemon?.types.map(slot => (
            <li className='card__item-type' key={slot.type.url}>{slot.type.name}</li>
          ))
        }
      </ul>
    </section>
    <hr className='card__hr' />
    <footer className='card__footer'>
      <ul className='card__list-stats'>
        {
          pokemon?.stats.map(stat => (
            <StatPokemon 
              key={stat.stat.url}
              infoStat={stat}
              color={pokemon?.types[0].type.name}
            />
          ))
        }
      </ul>
    </footer>
    </div>
  </article>
)
}


export default PokemonCard;
