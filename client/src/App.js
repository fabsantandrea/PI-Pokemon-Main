import './App.css';
import Home from './Components/Home';
import {Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import NavBar from './Components/NavBar';
import CreateCharacter from './Components/CreateCharacter';
import BackgroundColor from './Styles/BackgroundColor';
import PokemonDetail from './Components/PokemonDetail';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyle } from './Styles/GlobalStyle';
import Pokeball from './Components/Pokeball';



function App() {
  const pokemons = useSelector(state => state.filteredPokemons)

  return (
    <div className="App">
     
      <GlobalStyle />
    <BackgroundColor>
   
    <Route exact path = '/' component={LandingPage}/>
    <Route path = '/home' component={NavBar}/>
    <br></br>
    <Route exact path = '/home' component={Home}/>
    <Route exact path = '/createcharacter' component={CreateCharacter}/>
   
    <Route exact path = '/pokemon/:name'
      render = {({match}) => {
        const pokemonMatch = pokemons.find(pokemon => pokemon.name === match.params.name);
          return !pokemonMatch ? <Pokeball match={match} /> : <PokemonDetail pokemon= {pokemonMatch} match = {match}/>
          }
      }
/>
    </BackgroundColor>
     
    </div>
  );
}

export default App;
