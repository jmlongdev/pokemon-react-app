import { useState } from "react";
import axios from "axios";
import classes from "./PokemonSearchForm.module.css";

const PokemonSearchForm = () => {
  const [pokemonName, setPokemonName] = useState("");

  const pokemonNamehandler = (e) => {
    setPokemonName(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <div className={classes.titleSection}>
      <h1>Pokemon Stats</h1>
      <form onSubmit={submitFormHandler} className={classes.form}>
        <input type="text" onChange={pokemonNamehandler} />
        <button>Search Pokemon</button>
      </form>
    </div>
  );
};

export default PokemonSearchForm;
