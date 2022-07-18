import "./App.css";
import PokemonSearchForm from "./Components/PokemonSearchForm";
import PokemonDisplay from "./Components/PokemonDisplay";
import MainNavigation from "./Components/Layout/MainNavigation";
function App() {
  return (
    <div className="App">
      <MainNavigation />
      <PokemonSearchForm />
      <PokemonDisplay />
    </div>
  );
}

export default App;
