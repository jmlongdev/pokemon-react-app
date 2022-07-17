import { useState, Fragment } from "react";
import axios from "axios";
import classes from "./PokemonSearchForm.module.css";
import PokemonDisplay from "./PokemonDisplay";
// import PokemonDisplay from "./PokemonDisplay";

const PokemonSearchForm = (props) => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonArr, setPokemonArr] = useState([]);
  const [chosen, setIsChosen] = useState(false);

  const pokemonNamehandler = (e) => {
    setPokemonName(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        const loadedMon = [];
        loadedMon.push({
          name: pokemonName,
          species: response.data.species.name,
          image: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setIsChosen(true);
        console.log(loadedMon);
        setPokemonArr(loadedMon);
      });
  };
  console.log(pokemonArr);

  let content = <p>Please Search for a Pokemon!</p>;
  const pokemonList = pokemonArr.map((stat) => (
    <PokemonDisplay name={stat.species} key="1">
      <p>{stat.species}</p>
      <img src={stat.image} alt="charmander" />
      <p>
        Health {stat.hp} | Attack {stat.attack} | Defense {stat.defense} (Base
        values)
      </p>
      <p>Type: {stat.type}</p>
    </PokemonDisplay>
  ));

  if (chosen) {
    content = pokemonList;
  }

  return (
    <Fragment>
      <div className={classes.titleSection}>
        <h1>Pokemon Stats</h1>
        <form onSubmit={submitFormHandler} className={classes.form}>
          <input type="text" onChange={pokemonNamehandler} />
          <button>Search Pokemon</button>
        </form>
      </div>
      <div>
        <ul>{content}</ul>
      </div>
    </Fragment>
  );
};

export default PokemonSearchForm;
