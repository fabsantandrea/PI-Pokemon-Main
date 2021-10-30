import { useState } from "react"
import { useDispatch} from "react-redux"

import { getPokemonById, getPokemonByQuery } from "../Actions"
export default function SearchBar() {
    const [pokemon, setPokemon] = useState({
    })
    let dispatch = useDispatch()
    let handleChange = (e) => {
        setPokemon({
            ...pokemon,
            name: e.target.value
        })
    }
    let handleSubmit = (e) => {
        e.preventDefault()
        if (pokemon.name) {
            if (Number.isInteger(parseInt(pokemon.name) || pokemon.name.length > 25)) {
                dispatch(getPokemonById(pokemon.name))
            } else if (pokemon.name.length >= 1 && pokemon.name.length < 20){
                dispatch(getPokemonByQuery(pokemon.name.toLowerCase()))}
            
        }
   
    }
    return <div>   
        <form onSubmit= {handleSubmit}>
        <input name= 'name' placeholder='Insert name or ID' onChange= {handleChange}></input>
        <button >Search</button>
        </form>    
    </div>
}