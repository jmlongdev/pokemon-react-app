import "./App.css";
import PokemonSearchForm from "./Components/PokemonSearchForm";
import PokemonDisplay from "./Components/PokemonDisplay";
function App() {
  return (
    <div className="App">
      <PokemonSearchForm />
      <PokemonDisplay />
    </div>
  );
}

export default App;
