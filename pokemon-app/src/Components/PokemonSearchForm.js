import { useState, Fragment, useEffect } from "react";
import classes from "./PokemonSearchForm.module.css";
import PokemonDisplay from "./PokemonDisplay";
// import PokemonDisplay from "./PokemonDisplay";

const PokemonSearchForm = (props) => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonArr, setPokemonArr] = useState([]);
  const [chosen, setIsChosen] = useState(false);
  const [error, setError] = useState(null);
  const pokemonNamehandler = (e) => {
    setPokemonName(e.target.value);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchPokemonHandler = async (e) => {
    e.preventDefault();
    try {
      if (pokemonName.trim().length === 0) {
        return alert("Please enter a pokemon name!");
      }
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data);
      const loadedMon = [];
      loadedMon.push({
        name: pokemonName,
        species: data.species.name,
        image: data.sprites.front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        type: data.types[0].type.name,
      });
      setIsChosen(true);
      const name = loadedMon[0].name;
      loadedMon[0].name = capitalizeFirstLetter(name);

      setPokemonArr(loadedMon);
    } catch (error) {
      setIsChosen(false);
      setError(error.message);
    }
  };

  let content = <p>Please Search for a Pokemon!</p>;

  const pokemonList = pokemonArr.map((stat) => (
    <PokemonDisplay key="1">
      <div className={classes.displaySection}>
        <p>{stat.name}</p>
        <img src={stat.image} alt="charmander" />
        <p>
          Health {stat.hp} | Attack {stat.attack} | Defense {stat.defense} (Base
          values)
        </p>
        <p>Type: {stat.type}</p>
      </div>
    </PokemonDisplay>
  ));
  if (error) {
    content = <p>{error}</p>;
  }
  if (chosen) {
    content = pokemonList;
  }

  return (
    <Fragment>
      <div className={classes.titleSection}>
        <h1></h1>
        <form className={classes.form}>
          <input type="text" onChange={pokemonNamehandler} />
          <button onClick={fetchPokemonHandler}>Search Pokemon</button>
        </form>
      </div>
      <div>
        <ul>{content}</ul>
      </div>
    </Fragment>
  );
};

export default PokemonSearchForm;
