import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "./pokedex/PokemonCard";
import SearchInput from "./SearchInput";
import SelectType from "./pokedex/SelectType";
import pokemoon from "../assets/pokemon.png";
import pikachu from "../assets/pikachu.png";
import "./pokedex/style.css";
import Pagination from "./Pagination/PaginationComponent/Pagination";
import { usePagination } from "./Pagination/hooks/usePagination";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState();
  const [pokeSearch, setPokeSearch] = useState();
  const [optionType, setOptionType] = useState("All");

  useEffect(() => {
    if (optionType !== "All") {
      const URL = `https://pokeapi.co/api/v2/type/${optionType}`;
      axios
        .get(URL)
        .then((res) => {
          const arr = res.data.pokemon.map((e) => e.pokemon);
          const obj = { results: arr }
          setPokemons(obj.results)
        })
        .catch((err) => console.log(err));
    } else if (pokeSearch) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`;

      const obj = {
        results: [{ url }],
      };
      setPokemons(obj.results);
    } else {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [pokeSearch, optionType]);

  const nameTrainer = useSelector((state) => state.nameTrainer);

  const {
    currentPosts,
    // setpostsPag,
    // postsPag,
    currentPag,
    handdlePrev,
    handdleNext,
    handdlePage,
    maxPage,
    minPage,
    // numberLimit,
    pageNumebrs,
  } = usePagination(pokemons);

  return (
    <div>
      <h2 className="card__welcome">Welcome {nameTrainer}, Catch them all.</h2>
      <img src={pokemoon} alt="" className="card__pokemoon" />
      <img src={pikachu} alt="" className="card__pikachu" />
      <SearchInput
        setPokeSearch={setPokeSearch}
        setOptionType={setOptionType}
      />
      <SelectType
        optionType={optionType}
        setOptionType={setOptionType}
        setPokeSearch={setPokeSearch}
      />
      <div className="cards-container">
        {currentPosts?.map((pokemon) => (
          <PokemonCard key={pokemon.url} url={pokemon.url} />
        ))}
      </div>
      <Pagination
        handdlePrev={handdlePrev}
        handdleNext={handdleNext}
        handdlePage={handdlePage}
        maxPage={maxPage}
        minPage={minPage}
        pageNumebrs={pageNumebrs}
        currentPag={currentPag}
      />
    </div>
  );
};

export default Pokedex;
