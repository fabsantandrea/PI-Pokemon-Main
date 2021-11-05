import { useEffect } from "react"
import { useSelector } from "react-redux"
import Pokeball from "./Pokeball"
import Pokemons from "./Pokemons"

export default function Home () {
const pokemons = useSelector(state => state.filteredPokemons)

return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        { pokemons.length === 0 ? <Pokeball /> : <Pokemons />  }     
         </div> 
}