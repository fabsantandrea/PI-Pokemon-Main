import { useDispatch, useSelector } from "react-redux"
import Pokeball from "./Pokeball"
import { useEffect, useState } from "react"
import PokemonCard from "./PokemonCard"
import CardContainer from "../Styles/CardContainer"
import Pagination from "./Pagination"
import { Link } from "react-router-dom"
import { getPokemons } from "../Actions"

export default function Pokemons () {
 const pokemons = useSelector(state => state.filteredPokemons)
 const [currentPage, setCurrentPage] = useState(1)
 const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
 const paginate = pageNumber => {
   setCurrentPage(pageNumber)
   }



 const indexOfLastPokemon = currentPage * pokemonsPerPage
 const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
 const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    return (<div>
      
    
          <CardContainer>
            { 
            currentPokemons.map(pokemon => (
                  <Link to={`/pokemon/${pokemon.name}`} style={{textDecoration: 'none'}}>
                <PokemonCard  name={pokemon.name.toLowerCase()} image={pokemon.image} type= {pokemon.type}/>  <br></br></Link>
                
                ))}
          </CardContainer>
          <Pagination pokemonsPerPage= {pokemonsPerPage} totalPokemons= {pokemons.length} paginate={paginate}/>
         </div>)
}