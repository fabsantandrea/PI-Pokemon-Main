import './App.css';
import Home from './Components/Home';
import {Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import CreateCharacter from './Components/CreateCharacter';
import BackgroundColor from './Styles/BackgroundColor';
import PokemonDetail from './Components/PokemonDetail';
import { useSelector } from 'react-redux';
function App() {
  const pokemons = useSelector(state => state.filteredPokemons)

  return (
    <div className="App">
    <BackgroundColor>
    <Route exact path = '/' component={LandingPage}/>
    <Route path = '/' component={Header}/>
    <Route path = '/home' component={NavBar}/>
    <Route exact path = '/Home' component={Home}/>
    <Route exact path = '/createcharacter' component={CreateCharacter}/>
    <Route exact path = '/pokemon/:name'
      render = {({match}) => {
        const pokemonMatch = pokemons.find(pokemon => pokemon.name === match.params.name);
          return <PokemonDetail pokemon= {pokemonMatch} match = {match}/>
          }
      }
/>
    </BackgroundColor>
    </div>
  );
}

export default App;
