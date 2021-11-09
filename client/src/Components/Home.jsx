import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemons } from "../Actions"
import Pokeball from "./Pokeball"
import Pokemons from "./Pokemons"

export default function Home () {
const pokemons = useSelector(state => state.filteredPokemons)
const dispatch = useDispatch()
useEffect(() => {
       if (pokemons.length === 0)  dispatch(getPokemons())
      })
console.log(pokemons)

return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        { pokemons.length === 0 ? <Pokeball /> : <Pokemons />  }     
         </div> 
}