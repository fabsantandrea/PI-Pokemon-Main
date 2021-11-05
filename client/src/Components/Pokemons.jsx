import { useSelector } from "react-redux"
import Pokeball from "./Pokeball"
import { useState } from "react"
import PokemonCard from "./PokemonCard"
import CardContainer from "../Styles/CardContainer"
import Pagination from "./Pagination"
import { Link } from "react-router-dom"

export default function Pokemons () {
 const pokemons = useSelector(state => state.filteredPokemons)
 const [currentPage, setCurrentPage] = useState(1)
 const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
 const paginate = pageNumber => {
   setCurrentPage(pageNumber)
   }

console.log(pokemons)

 const indexOfLastPokemon = currentPage * pokemonsPerPage
 const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
 const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    return (<>
      
    <Pagination pokemonsPerPage= {pokemonsPerPage} totalPokemons= {pokemons.length} paginate={paginate}/>
          <CardContainer>
            { 
             currentPage === 1 ? pokemons.slice(0,9).map(pokemon => (
              <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id} style={{textDecoration: 'none'}}>
                <PokemonCard name={pokemon.name.toLowerCase()} image={pokemon.image} type= {pokemon.type}/> <br></br></Link>
                )) : currentPokemons.map(pokemon => (
                  <Link to={`/pokemon/${pokemon.name}`} style={{textDecoration: 'none'}}>
                <PokemonCard  name={pokemon.name.toLowerCase()} image={pokemon.image} type= {pokemon.type}/>  <br></br></Link>
                
                ))}
          </CardContainer>
    
    
          
         </>)
}